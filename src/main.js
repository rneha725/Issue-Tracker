function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../resource/config.json', false);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

function initialize() {
    loadJSON(function (response) {
        config = response;
    });

    var assignedTo = document.getElementById("issueAssignedToInput");
    var team = JSON.parse(config)[1].TEAM;
    team.forEach(element => {
        var option = document.createElement('option');
        option.value = element;
        option.text = element;
        assignedTo.add(option);
    });

    var severity = document.getElementById("issueSeverityInput");
    var severityList = JSON.parse(config)[1].SEVERITY;
    severityList.forEach(element => {
        var option = document.createElement('option');
        option.value = element;
        option.text = element;
        severity.add(option);
    });

    fetchIssues();
}

function saveIssue(e) {
    var id = chance.guid();
    var desc = document.getElementById("issueDescInput").value;
    var severity = document.getElementById("issueSeverityInput").value;
    var assignedTo = document.getElementById("issueAssignedToInput").value;
    var status = "Open";

    var issue = {
        id: id,
        description: desc,
        severity: severity,
        assignedTo: assignedTo,
        status: status
    }

    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();
}

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById("issuesList");

    issues.forEach(element => {
        issuesList.innerHTML += '<div class="well">' +
            '<h6>Issue ID: ' + element.id + '</h6>' +
            '<p><span class="label label-info">' + element.status + '</span></p>' +
            '<h3>' + element.description + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + element.severity + ' ' +
            '<span class="glyphicon glyphicon-user"></span> ' + element.assignedTo + '</p>' +
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + element.id + '\')">Close</a> ' +
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + element.id + '\')">Delete</a>' +
            '</div>';
    })
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    issues.forEach(element => {
        if (element.id == id) {
            element.status = "Closed";
        }
    });

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();

    location.reload();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();

    location.reload();
}