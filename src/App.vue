<template>
  <div id="app">
    <div class="main">
      <div class="logo">
        <img src="@/assets/logo.png" alt="Top Table Legacy" />
      </div>
      <div class="main__header">
        <h4>Weekender 2 Registration</h4>
        <p class="main__subtitle">
          11th-13th October 2019
        </p>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<style>
html, body {
  min-height: 100%;
}
html {
  height: 100%;
  background-color: #FFF;
}
@media only screen and (min-width: 700px) {
  html {
    background-color: #000;
    background-image: url('./assets/bg-1.jpg');
    background-size: cover;
    background-attachment: fixed;
  }
}
body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: transparent !important;
  min-height: 100%;
  padding: 0;
}
.main {
  max-width: 100%;
  padding: 30px;
  overflow: hidden;
  min-height: 100%;
}
@media only screen and (min-width: 700px) {
  .main {
    width: 400px;
    background: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 40px rgba(0,0,0,0.7);
  }
}
.main__header {
  text-align: center;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  margin-bottom: 20px;
}
.main__header h4 {
  margin: 0;
  padding: 0;
}
.main__subtitle {
  font-size: 16px;
  color: #777;
  margin: 0;
  padding: 5px 0 0;
}
.logo {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
}
.logo img{
  width: 100%;
  display: block;
}
</style>
