let tables = document.getElementsByTagName('table')

for (let table of tables) {
    makeTableResizable(table)
}

function makeTableResizable(table) {
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
        cols[i].style.position = 'relative';
        cols[i].appendChild(div);
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
        firstColumns[i].style.position = 'relative';
        firstColumns[i].appendChild(div);
        setRowListeners(div)
    }
}

function createDiv(type, tableHeight, tableWidth) {
    let div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    div.style.zIndex = '100';

    if (type === 'col') {
        div.style.top = '0';
        div.style.right = '0';
        div.style.width = '5px';
        div.style.height = tableHeight + 'px';
        div.className = 'columnSelector';
    }

    if (type === 'row') {
        div.style.bottom = '0';
        div.style.left = '0';
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

    document.addEventListener('mouseup', function () {
        if (curCol) {
            let parentTable = curCol.closest('table');
            let rowResizers = parentTable.querySelectorAll('.rowSelector');

            for (let row of rowResizers) {
                row.style.width = parentTable.offsetWidth + 'px';
            }
        }

        curCol = undefined;
        pageX = undefined;
        curColWidth = undefined;
    });
}

function setRowListeners(div) {
    let pageY, curCol, curColHeight;

    div.addEventListener('mousedown', function (e) {
        curCol = e.target.parentElement;
        pageY = e.pageY;
        curColHeight = curCol.offsetHeight
    });

    document.addEventListener('mousemove', function (e) {
        if (curCol) {
            let diffY = e.pageY - pageY;
            curCol.style.height = (curColHeight + diffY) + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        if (curCol) {
            let parentTable = curCol.closest('table');
            let colResizers = parentTable.querySelectorAll('.columnSelector');

            for (let col of colResizers) {
                col.style.height = parentTable.offsetHeight + 'px';
            }
        }

        curCol = undefined;
        pageY = undefined;
        curColHeight = undefined;
    });
}