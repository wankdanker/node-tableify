module.exports = tableify;

function tableify(obj, processingArray) {
	var buf = [];

	if (Array.isArray(obj)) {
		buf.push('<table>','<thead>','<tr>');

		Object.keys(obj).forEach(function (key) {
			buf.push('<th>', key, '</th>');
		});

		buf.push('</tr>', '</thead>', '<tbody>');

		obj.forEach(function (record) {
			buf.push('<tr>');
			buf.push(tableify(record, true));
			buf.push('</tr>');
		});

		buf.push('</tbody></table>');
	}
	else if (typeof obj === 'object') {
		if (!processingArray) {
			buf.push('<table>', '<thead>', '<tr>');

			Object.keys(obj).forEach(function (key) {
				buf.push('<th>', key, '</th>');
			});

			buf.push('</tr>', '</thead>', '<tbody>','<tr>');
		}

		Object.keys(obj).forEach(function (key) {
			buf.push(tableify(obj[key]));
		});

		if (!processingArray) {
			buf.push('</tr></tbody></table>');
		}
	}
	else {
		buf.push('<td>', obj, '</td>');
	}
	
	return buf.join('');
}
