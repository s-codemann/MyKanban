let users = [];

function addBacklog() {
    let backlog = document.getElementById('backlogItem')
    backlog.innerHTML = ``;
    for (let i = 0; i < 8; i++) {
        backlog.innerHTML += `
        <div id="backlogContainer${i}" class="backlogContainer urgencyColorRed">
                <div class="assignedTo" class="category">
                    <img src="img/guy.jpg" alt="" class="backlogAssignedToPicture" />
                    <div>
                        <p class="margin0">Vorname, Nachname</p>
                        <p class="fontColor margin0">Email</p>
                    </div>
                </div>
                <p class="category">Marketing</p>
                <div class="detailsContainer">
                    <h3 class="fontColor detailsHeadlineResponsiv">DETAILS</h3>
                    <p class="details">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
        `;
    }
}