const closeModal = document.querySelector(".fa-solid");
const modalContent = document.querySelector(".modal-content");
const winner = document.querySelector(".voice-winner")

closeModal.addEventListener("click" , function(){
  modalContent.remove();
});

window.addEventListener('load' , () => {
  winner.play();
});