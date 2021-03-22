<template>
  <div style="padding-top:10px; border: 0px red solid;">

    <div class="form-input-group">

        <input v-if="_event == 'change'"
               v-model="model[name]" :type="type" @change="emitValue($event)" required=false :style="'height:' + _height" @focus="inputFocus($event)">
        <input v-else
               v-model="model[name]" :type="type" @input="emitValue($event)" required=false :style="'height:' + _height" @focus="inputFocus($event)" >

        <span class="bar"></span>

        <label class="input-label">{{ title }}</label>

        <div v-if="required" class="required-icon" > * </div>

        <div class="form-input-error-box"></div>

    </div>

  </div>
</template>

<script>
export default {

  name: 'FormInputRow',
  props: ['model', 'name', 'title', 'param', 'validate'],

  computed: {

    inputModel() {
      return this.model
    },

    type() {
      return this.getParam('type', 'text');
    },

    required() {
      return this.getParam('required', false);
    },

    _event() {
      return this.getParam('event', 'input');
    },

    _height() {
      return this.getParam('height', 42) + 'px';
    },
  },

  methods: {

    emitValue(event) {
      const name = this.name
      const value = this.model[name]
      this.$emit('input', { name, value, event })
    },

    getParam(field, value = null) {
      let result = value;
      if (this.param && this.param[field])
        result = this.param[field];
      return result
    },

    inputFocus(event) {
       this.clearErrorBoxList();
       this.emitValue(event)
    },

    clearErrorBoxList() {
        let errorList = document.querySelectorAll('.form-input-error-box');
        errorList.forEach(elem => {
            // elem.innerHTML = '';
        });
    }

  },

}
</script>

<style scoped>

.form-input-error-box {
  color: red;
  font-style: italic;
  margin: 0px;
  padding: 0px 0px 0px 5px;
  border: 0px red solid;
}

.required-icon {
  color: red;
  font-size: 14px;
  font-weight: bold;
  margin: -60px 0px 0px -3px;
  position: absolute;
}

/* form default styles */
.form-input-group {
  position: relative;
  margin: 12px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  border: 0px green solid;
}

input {
  font-size: 14px;
  font-weight: normal;
  padding: 10px;
  display: block;
  width: 100%;
  border: none;
  border: 1px solid #ccc;
  /*height: 34px;*/
}

input:focus {
  outline: none;
}


/* LABEL ======================================= */
.input-label {
  color: #999;
  font-size: 15px;
  font-style: italic;
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  font-weight: normal;
  border: 0px;
}

/* active state input:valid ~ label */
input:focus ~ .input-label, input:valid ~ .input-label {
  top: -19px;
  font-size: 13px;
  color: #5264AE;
  font-style: italic;
  font-weight: bold;
}

.input-label-active {
  top: -17px;
  font-size: 12px;
  color: #5264AE;
  font-style: italic;
}

/* BOTTOM BARS */
.bar {
  position: relative;
  display: block;
  width: 100%;
}

.bar:before, .bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 0;
  position: absolute;
  background: #5264AE;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}

/* active state */
input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}


/*@import url('https://fonts.googleapis.com/css?family=Satisfy&display=swap');*/
/*html {*/
/*  font-family: 'Satisfy', cursive;*/
/*  width: 100%;*/
/*  background-image: linear-gradient(to right top, #8500d1, #6e00c7, #5500be, #3800b3, #0000a9);*/
/*  height: 100vh;*/
/*}*/

/*body {*/
/*  margin: 5% auto 0 auto;*/
/*  width: 90%;*/
/*  max-width: 1125px;*/

/*}*/

/*h1 {*/
/*  font-size: 45px;*/
/*  margin-bottom: 2.5%;*/
/*  color: #fff;*/
/*  margin-bottom: 70px;*/
/*  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);*/
/*}*/

/*input,*/
/*span,*/
/*label,*/
/*textarea {*/
/*  font-family: 'Satisfy', cursive;*/
/*  display: block;*/
/*  margin: 10px;*/
/*  padding: 5px;*/
/*  border: none;*/
/*  font-size: 22px;*/
/*}*/

/*textarea:focus,*/
/*input:focus {*/
/*  outline: 0;*/
/*}*/
/*!* Question *!*/

/*input.question,*/
/*textarea.question {*/
/*  font-size: 28px;*/
/*  line-height: 48px;*/
/*  font-weight: 300;*/
/*  border-radius: 2px;*/
/*  margin: 0;*/
/*  border: none;*/
/*  width: 100%;*/
/*  background: rgba(0, 0, 0, 0);*/
/*  transition: padding-top 0.2s ease, margin-top 0.2s ease;*/
/*  overflow: hidden; !* Hack to make "rows" attribute apply in Firefox. *!*/
/*  height: 60px;*/
/*  color: #fff;*/

/*}*/
/*!* Underline and Placeholder *!*/
/*textarea.question{*/
/*  line-height: 64px;*/
/*  resize: none;*/
/*}*/
/*input.question + label,*/
/*textarea.question + label {*/
/*  display: block;*/
/*  position: relative;*/
/*  white-space: nowrap;*/
/*  padding: 0;*/
/*  margin: 0;*/
/*  width: 10%;*/
/*  border-top: 4px solid #ff12b6;*/
/*  -webkit-transition: width 0.4s ease;*/
/*  transition: width 0.4s ease;*/
/*  height: 0px;*/
/*  border-radius: 5px;*/
/*}*/

/*input.question:focus + label,*/
/*textarea.question:focus + label {*/
/*  width: 100%;*/
/*}*/

/*input.question:focus,*/
/*input.question:valid,*/
/*textarea.question:valid,*/
/*textarea.question:focus*/
/*{*/
/*  padding-top: -35px;*/
/*  padding-top: -35px;*/
/*}*/


/*input.question:focus + label > span, textarea.question:focus + label > span,*/
/*input.question:valid + label > span, textarea.question:valid + label > span {*/
/*  top: -100px;*/
/*  font-size: 22px;*/
/*  color: #ff12b6;*/
/*  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);*/
/*}*/


/*input.question:valid + label,*/
/*textarea.question:valid + label {*/
/*  border-color: #1183FF;*/
/*}*/

/*input.question:invalid,*/
/*textarea.question:invalid {*/
/*  box-shadow: none;*/
/*}*/

/*input.question + label > span,*/
/*textarea.question + label > span {*/
/*  font-weight: 300;*/
/*  margin: 0;*/
/*  position: absolute;*/
/*  color: #baacac;*/
/*  font-size: 38px;*/
/*  top: -66px;*/
/*  left: 0px;*/
/*  z-index: -1;*/
/*  -webkit-transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;*/
/*  transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;*/
/*}*/

/*input[type="submit"] {*/
/*  -webkit-transition: opacity 0.2s ease, background 0.2s ease;*/
/*  transition: opacity 0.2s ease, background 0.2s ease;*/
/*  display: block;*/
/*  opacity: 0;*/
/*  margin: 10px 0 0 0;*/
/*  padding: 10px;*/
/*  cursor: pointer;*/
/*  border-radius: 30px;*/
/*  width: 164px;*/
/*  box-shadow: 5px 5px 10px rgba(0,0,0,0.3);*/
/*  background: #ff12b6;*/
/*  color: #fff;*/
/*}*/

/*input[type="submit"]:hover {*/
/*  background: #D11A98;*/
/*}*/

/*input[type="submit"]:active {*/
/*  background: #D11A98;*/
/*}*/

/*input.question:valid ~ input[type="submit"],*/
/*textarea.question:valid ~ input[type="submit"] {*/
/*  -webkit-animation: appear 1s forwards;*/
/*  animation: appear 1s forwards;*/
/*}*/
/*hr{*/
/*  clear: both;*/
/*  margin-top: 10px;*/
/*  margin-bottom: 50px;*/
/*  border: 0;*/
/*}*/
/*input.question:invalid ~ input[type="submit"],*/
/*textarea.question:invalid ~ input[type="submit"] {*/
/*  display: none;*/
/*}*/

/*@-webkit-keyframes appear {*/
/*  100% {*/
/*    opacity: 1;*/
/*  }*/
/*}*/

/*@keyframes appear {*/
/*  100% {*/
/*    opacity: 1;*/
/*  }*/
/*}*/


</style>
