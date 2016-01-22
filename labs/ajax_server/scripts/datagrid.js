function DataGrid(container, dataModel, columnModel) {
		this.container = container;
		this.dataModel = dataModel;
		this.columnModel = columnModel;
		
		var httpRequest;
		
		if (dataModel instanceof Array) {
			loadTable();
		} else {
			makeRequest(dataModel, loadRecords);
		}
		
		function makeRequest(url, callback) {
			httpRequest = new XMLHttpRequest();

			if (!httpRequest) {
			  alert('Giving up :( Cannot create an XMLHTTP instance');
			  return false;
			}
			httpRequest.onreadystatechange = callback;
			httpRequest.open('GET', url);
			httpRequest.send();
		}
		function loadRecords() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
			  if (httpRequest.status === 200) {
				 this.dataModel = dataModel = JSON.parse(httpRequest.responseText);
				 loadTable();
			  } else {
				alert('There was a problem with the request.');
			  }
			}
		}

		function loadTable() {
			//create HTMLTable
			var tableElement = document.createElement("table");
			
			//append table to container
			var containerElement = document.getElementById(container);
			
			//create table header
			var tableHeader = tableElement.createTHead();
			
			//for each column in column model add header cell
			var headerRow = document.createElement("tr");
			tableHeader.appendChild(headerRow);
			for (var col in columnModel) {
				var cell = headerRow.insertCell();
				cell.innerHTML = columnModel[col].columnTitle;
			}
			
			//for each row in data model
			for (var dataIndex in dataModel) {
				//create row
				var dataRow = tableElement.insertRow();
				//for each column in column model, 
				for (var col in columnModel) {
					//create cell
					var cell = dataRow.insertCell();
					
					//render the cell with current row
					cell.innerHTML = columnModel[col].renderColumn(dataModel[dataIndex], cell);
				}
			}
			containerElement.appendChild(tableElement);
		}
}