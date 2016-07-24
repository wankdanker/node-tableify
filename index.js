"use strict";

module.exports = tableify;

function tableify(obj, columns, parents) {
    var buf = [];
    var type = typeof obj;
    var cols;

    parents = parents || [];

    if (type !== 'object' || obj == null || obj == undefined) {
    }
    else if (~parents.indexOf(obj)) {
        return "[Circular]";
    }
    else {
        parents.push(obj);
    }

    if (Array.isArray(obj)) {
        if (obj.every(Array.isArray)) {
            buf.push('<table>','<tbody>');
            cols = [];
            
            // 2D array is an array of rows
            obj.forEach(function (row, ix) {
                cols.push(ix);

                buf.push('<tr>');

                row.forEach(function (val) {
                    buf.push('<td' + getClass(val) + '>', tableify(val, cols, parents), '</td>')
                })
                
                buf.push('</tr>');
            });
            
            buf.push('</tbody>','</table>');
        }
        else if (typeof obj[0] === 'object') {
            buf.push('<table>','<thead>','<tr>');

            //loop through every object and get unique keys
            var keys = {};
            obj.forEach(function (o) {
                if (typeof o === 'object' && !Array.isArray(o)) {
                    Object.keys(o).forEach(function (k) {
                        keys[k] = true;
                    });
                }
            });

            cols = Object.keys(keys);

            cols.forEach(function (key) {
                buf.push('<th' + getClass(obj[0][key]) + '>', key, '</th>');
            });

            buf.push('</tr>', '</thead>', '<tbody>');

            obj.forEach(function (record) {
                buf.push('<tr>');
                buf.push(tableify(record, cols, parents));
                buf.push('</tr>');
            });

            buf.push('</tbody></table>');
        }
        else {
            buf.push('<table>','<tbody>');
            cols = [];
            
            obj.forEach(function (val, ix) {
                cols.push(ix);
                buf.push('<tr>', '<td' + getClass(val) + '>', tableify(val, cols, parents), '</td>', '</tr>');
            });
            
            buf.push('</tbody>','</table>');
        }
        
    }
    else if (obj && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date)) {
        if (!columns) {
            buf.push('<table>');

            Object.keys(obj).forEach(function (key) {
                buf.push('<tr>', '<th' + getClass(obj[key]) + '>', key, '</th>', '<td' + getClass(obj[key]) + '>', tableify(obj[key], false, parents), '</td>', '</tr>');
            });

            buf.push('</table>');
        }
        else {
            columns.forEach(function (key) {
                if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key], false, parents), '</td>');
                }
                else {
                    buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key], columns, parents), '</td>');
                }
            });
        }
    }
    else {
        buf.push(obj);
    }

    if (type !== 'object' || obj == null || obj == undefined) {
    }
    else {
        parents.pop(obj);
    }

    return buf.join('');
}

function getClass(obj) {
    return ' class="' 
        + ((obj && obj.constructor)
            ? obj.constructor.name 
            : typeof obj
        ).toLowerCase()
        + ((obj === null)
            ? ' null'
            : ''
        )
        + '"'
        ;
}
