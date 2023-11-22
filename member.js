function skillsMember()  
{  
    var skills = document.getElementById("skills").value;  
    var skills_error = document.getElementById("skills_error");  
    if (skills == "")  
    {  
        skills_error.textContent = "Skills is required";  
        return false;  
    }  
    else  
    {  
        skills_error.textContent = "";  
        return true;  
    }  
}
