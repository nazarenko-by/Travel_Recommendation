
document.addEventListener('DOMContentLoaded', function() {
  // Create social sidebar element
  const socialSidebar = document.createElement('div');
  socialSidebar.className = 'social-sidebar';
  
  // Add social links container
  const socialLinks = document.createElement('div');
  socialLinks.className = 'social-links';
  
  // Create Facebook link
  const facebookLink = document.createElement('a');
  facebookLink.href = 'https://facebook.com';
  facebookLink.target = '_blank';
  facebookLink.rel = 'noreferrer';
  facebookLink.setAttribute('aria-label', 'Facebook');
  facebookLink.innerHTML = '<i class="fab fa-facebook-f"></i>';
  
  // Create Instagram link
  const instagramLink = document.createElement('a');
  instagramLink.href = 'https://instagram.com';
  instagramLink.target = '_blank';
  instagramLink.rel = 'noreferrer';
  instagramLink.setAttribute('aria-label', 'Instagram');
  instagramLink.innerHTML = '<i class="fab fa-instagram"></i>';
  
  // Create YouTube link
  const youtubeLink = document.createElement('a');
  youtubeLink.href = 'https://youtube.com';
  youtubeLink.target = '_blank';
  youtubeLink.rel = 'noreferrer';
  youtubeLink.setAttribute('aria-label', 'YouTube');
  youtubeLink.innerHTML = '<i class="fab fa-youtube"></i>';
  
  // Append links to container
  socialLinks.appendChild(facebookLink);
  socialLinks.appendChild(instagramLink);
  socialLinks.appendChild(youtubeLink);
  
  // Append container to sidebar
  socialSidebar.appendChild(socialLinks);
  
  // Add sidebar to the page
  document.body.appendChild(socialSidebar);
});
