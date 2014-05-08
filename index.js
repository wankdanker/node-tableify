module.exports = tableify;

function tableify(obj, processingArray) {
	var buf = [];


	if (Array.isArray(obj)) {
		if (typeof obj[0] === 'object') {
			buf.push('<table>','<thead>','<tr>');

			Object.keys(obj[0] || {}).forEach(function (key) {
				buf.push('<th' + getClass(obj[0][key]) + '>', key, '</th>');
			});

			buf.push('</tr>', '</thead>', '<tbody>');

			obj.forEach(function (record) {
				buf.push('<tr>');
				buf.push(tableify(record, true));
				buf.push('</tr>');
			});

			buf.push('</tbody></table>');
		}
		else {
			buf.push('<table>','<tbody>');

			obj.forEach(function (val) {
				buf.push('<tr>', '<td' + getClass(val) + '>', tableify(val, true), '</td>', '</tr>');
			});

			buf.push('</tbody>','</table>');
		}
		
	}
	else if (obj && typeof obj === 'object' && obj.constructor.name === 'Object') {
		if (!processingArray) {
			buf.push('<table>');

			Object.keys(obj).forEach(function (key) {
				buf.push('<tr>', '<th' + getClass(obj[key]) + '>', key, '</th>', '<td' + getClass(obj[key]) + '>', tableify(obj[key]), '</td>', '</tr>');
			});

			buf.push('</table>');
		}
		else {
			Object.keys(obj).forEach(function (key) {
				if (typeof obj[key] === 'object' && obj.constructor.name === 'Object') {
					buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key]), '</td>');
				}
				else {
					buf.push('<td' + getClass(obj[key]) + '>', tableify(obj[key], processingArray), '</td>');
				}
			});
		}
	}
	else {
		buf.push(obj);
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
