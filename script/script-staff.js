document.addEventListener('DOMContentLoaded', () => {
    fetch('../json/staff.json')
        .then(response => response.json())
        .then(data => {
            const staffContainer = document.getElementById('staff-container');
            data.forEach(department => {
                const departmentDiv = document.createElement('div');
                departmentDiv.className = 'department';
                
                const departmentTitle = document.createElement('h2');
                departmentTitle.textContent = department.department;
                departmentDiv.appendChild(departmentTitle);
                
                department.members.forEach(member => {
                    const memberDiv = document.createElement('div');
                    memberDiv.className = 'staff-member';
                    const img = document.createElement('img');
                    img.className = "imgdiv";
                    // Set the source of the image
                    if (member.images === "true") {
                        img.src = 'https://cravatar.eu/helmhead/' + member.name + "/96"; // Replace with your image URL
                
                        // Optionally set other attributes
                        img.alt = 'Le skin de '+ member.name; // Alternative text for the image
                        img.style.maxWidth = '100%'; // Ensure image fits within the container
                    } else {
                        img.src = 'https://cravatar.eu/head/steve/96'
                    }
                    
                    const nameDiv = document.createElement('div');
                    nameDiv.className = 'name';
                    nameDiv.textContent = member.name;
                    
                    const gradeDiv = document.createElement('div');
                    gradeDiv.className = 'grade';
                    gradeDiv.textContent = member.grade;
                    memberDiv.appendChild(img);
                    memberDiv.appendChild(nameDiv);
                    memberDiv.appendChild(gradeDiv);
                    departmentDiv.appendChild(memberDiv);
                });

                staffContainer.appendChild(departmentDiv);
            });
        })
        .catch(error => console.error('Error loading staff data:', error));
});
