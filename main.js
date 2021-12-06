let tables = document.getElementsByTagName('table')

for (let table of tables) {
    resizableGrid(table)
}

function resizableGrid(table) {
    addColumnsResizers(table);
    addRowsResizers(table);
}

function addColumnsResizers(table) {
    let row = table.getElementsByTagName('tr')[0];
    let cols = row ? row.children : undefined;
    if (!cols) {
        return;
    }

    for (let i = 0; i < cols.length; i++) {
        let div = createDiv('col', table.offsetHeight, table.offsetWidth);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setColListeners(div);
    }
}

function addRowsResizers(table) {
    let rows = table.getElementsByTagName('tr');

    if (rows.length === 0) {
        return;
    }

    let firstColumns = [];

    for (let i = 0; i < rows.length; i++) {
        firstColumns.push(rows[i].children[0])
    }

    for (let i = 0; i < firstColumns.length; i++) {
        let div = createDiv('row', table.offsetHeight, table.offsetWidth);
        firstColumns[i].appendChild(div);
        firstColumns[i].style.position = 'relative';
        setRowListeners(div)
    }
}

function createDiv(type, tableHeight, tableWidth) {
    let div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';

    if (type === 'col') {
        div.style.top = 0;
        div.style.right = 0;
        div.style.width = '5px';
        div.style.height = tableHeight + 'px';
        div.className = 'columnSelector';
    }

    if (type === 'row') {
        div.style.bottom = 0;
        div.style.left = 0;
        div.style.height = '5px';
        div.style.width = tableWidth + 'px';
        div.className = 'rowSelector';
    }

    return div;
}

function setColListeners(div) {
    let pageX, curCol, curColWidth;

    div.addEventListener('mousedown', function (e) {
        curCol = e.target.parentElement;
        pageX = e.pageX;
        curColWidth = curCol.offsetWidth
    });

    document.addEventListener('mousemove', function (e) {
        if (curCol) {
            let diffX = e.pageX - pageX;
            curCol.style.width = (curColWidth + diffX) + 'px';
        }
    });

    document.addEventListener('mouseup', function (e) {
        curCol = undefined;
        pageX = undefined;
        curColWidth = undefined;
    });
}

function setRowListeners(div) {
    let pageY, curCol, nxtCol, curColHeight, nxtColHeight;

    div.addEventListener('mousedown', function (e) {
        curCol = e.target.parentElement;
        nxtCol = curCol.nextElementSibling;
        pageY = e.pageY;
        curColHeight = curCol.offsetHeight
        if (nxtCol)
            nxtColHeight = nxtCol.offsetHeight
    });

    document.addEventListener('mousemove', function (e) {
        if (curCol) {
            let diffX = e.pageY - pageY;

            if (nxtCol)
                nxtCol.style.height = (nxtColHeight - (diffX)) + 'px';

            curCol.style.height = (curColHeight + diffX) + 'px';
        }
    });

    document.addEventListener('mouseup', function (e) {
        curCol = undefined;
        nxtCol = undefined;
        pageY = undefined;
        nxtColHeight = undefined;
        curColHeight = undefined;
    });
}


