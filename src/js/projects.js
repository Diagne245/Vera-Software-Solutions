import project_1_html from '../html_files/projects/project_1.html';
import project_2_html from '../html_files/projects/project_2.html';
import project_3_html from '../html_files/projects/project_3.html';
import project_4_html from '../html_files/projects/project_4.html';
import project_5_html from '../html_files/projects/project_5.html';
import project_6_html from '../html_files/projects/project_6.html';

const loadProjects = () => {
  document.getElementById('project-1').innerHTML = project_1_html;
  document.getElementById('project-2').innerHTML = project_2_html;
  document.getElementById('project-3').innerHTML = project_3_html;
  document.getElementById('project-4').innerHTML = project_4_html;
  document.getElementById('project-5').innerHTML = project_5_html;
  document.getElementById('project-6').innerHTML = project_6_html;
};

export default loadProjects;
