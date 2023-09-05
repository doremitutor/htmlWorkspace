let deferredPrompt, addBtn;
window.addEventListener('load', setup);
function setup(){
  addBtn = document.querySelector('#add-button');
};
/* window.addEventListener('beforeinstallprompt', (e) => {
  alert('beforeInstalling');
  //e.preventDefault();
  console.log(e.platforms);
  deferredPrompt = e;
  addBtn.style.display = 'block';
  addBtn.addEventListener('click', (e) => {
    addBtn.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
  }); */