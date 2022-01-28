export const startTransition = (time = 300) => {
  document.querySelector('.transition-page').style.opacity = 1
  setTimeout(() => {
    document.querySelector('.transition-page').style.opacity = 0
  }, time)
}
