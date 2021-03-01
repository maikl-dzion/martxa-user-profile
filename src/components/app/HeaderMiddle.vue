<template>

  <div class="header-middle bg-2 my__header-middle" >
    <div class="container" style="height: 100%; padding-top: 0px;">
      <div class="row" >

        <div class="col-md-3 hidden-sm hidden-xs" >
          <div class="logo" style=" position: absolute; height: 55px;" >
            <h1 style="padding:14px 0px;">
              <router-link tag="a" to="/">Bolderfest.ru</router-link>
            </h1>
          </div>
        </div>

        <div class="col-md-9 col-xs-12">
          <div class="header-middle-right" style="margin: 6px 0;" >
            <ul>
              <li>
                <div class="contact-icon">
                  <i class="fa fa-clock-o"></i>
                </div>
                <div class="contact-info">
                  <p>MON - SAT (9AM - 5PM)</p>
                  <span>Sunday colsed</span>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fa fa-envelope"></i>
                </div>
                <div class="contact-info">
                  <p>MAIL US</p>
                  <span>dzion67@mail.ru</span>
                </div>
              </li>
              <li>
                <div class="contact-icon">
                  <i class="fa fa-phone"></i>
                </div>
                <div class="contact-info">
                  <p>PHONE US</p>
                  <span> (+7) 906 248 62 09</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "HeaderMiddle"
}
</script>

<style scoped>

.my__header-middle {
    /*height: 55px;*/
    padding: 0px; margin: 0px;
}

/* На верхнем уровне кода */
@media screen and (max-width: 1230px) {
  .my__header-middle {
    height: 100%;
  }
}
</style>
