var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var submitBtn = document.getElementById("submitBtn");
var siteNameInputValidation = document.getElementById("siteNameInput");
var siteUrlInputValidation = document.getElementById("siteUrlInput");

var sitesList = [];
if (localStorage.getItem("allSites") !=null) 
{
    sitesList = JSON.parse(localStorage.getItem("allSites"));
    displaySites(sitesList);
}
                                                                    // ADD
function addSites() 
{
    if (validSiteUrl() && validSiteName()) 
    {
        var sites = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        };
        sitesList.push(sites);
        localStorage.setItem("allSites", JSON.stringify(sitesList));
        clearForm();
    }
}
                                                                    // DISPLAY DATA
function displaySites(list) 
{
    var displayData = " ";
    for (var i = 0; i < list.length; i++) 
    {
        displayData += `<tr>
    <th scope="row">${i + 1}</th>
    <td class="text-capitalize">${list[i].name}</td>
    <td><button id="visitBtn" class="btn" onclick="visitSite('${list[i].url}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
    </td>
</tr>`
    }
    document.querySelector("tbody").innerHTML = displayData;
}
                                                                    // CLEAR DATA
function clearForm() 
{
    siteNameInput.value = "";
    siteUrlInput.value = "";
    document.getElementById("validName").classList.add("d-none");
    document.getElementById("validUrl").classList.add("d-none");
    document.getElementById("siteNameInput").classList.remove("is-valid");
    document.getElementById("siteUrlInput").classList.remove("is-valid");
}
                                                                    // DELETE DATA
function deleteSite(index) 
{
    sitesList.splice(index, 1);
    localStorage.setItem("allSites", JSON.stringify(sitesList));
    displaySites(sitesList);
}
                                                                    // VISITE
function visitSite(url) 
{
    window.open(url, '_blank');
}
                                                                    // NAME VALIDATION
function validSiteName() 
{
    var regex = /^(?!\s+$)[a-zA-Z\s]+$/;
    var isValid = regex.test(siteNameInput.value);
    if (isValid) 
    {
        document.getElementById("siteNameInput").classList.add("is-valid");
        document.getElementById("siteNameInput").classList.remove("is-invalid");
        document.getElementById("validName").classList.remove("d-none");
        document.getElementById("inValidName").classList.add("d-none");
    }
    else 
    {
        document.getElementById("siteNameInput").classList.remove("is-valid");
        document.getElementById("siteNameInput").classList.add("is-invalid");
        document.getElementById("validName").classList.add("d-none");
        document.getElementById("inValidName").classList.remove("d-none");
    }
    return isValid;
}
                                                                    // URL VALIDATION
function validSiteUrl() 
{
    let regex = /^(https:\/\/|http:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i;
    let isValid = regex.test(siteUrlInput.value);
    if (isValid) {
        document.getElementById("siteUrlInput").classList.add("is-valid");
        document.getElementById("siteUrlInput").classList.remove("is-invalid");
        document.getElementById("validUrl").classList.remove("d-none");
        document.getElementById("inValidUrl").classList.add("d-none");
    }
    else {
        document.getElementById("siteUrlInput").classList.remove("is-valid");
        document.getElementById("siteUrlInput").classList.add("is-invalid");
        document.getElementById("inValidUrl").classList.remove("d-none");
        document.getElementById("validUrl").classList.add("d-none");
    }
    return isValid;
}
submitBtn.addEventListener('click', () => {addSites(); displaySites(sitesList);})
siteNameInputValidation.addEventListener('input', () => { return validSiteName() })
siteUrlInputValidation.addEventListener('input', () => { return validSiteUrl() })