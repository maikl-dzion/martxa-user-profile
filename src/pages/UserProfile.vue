<template>
<page-template>

      <!-- breadcumb-area start -->
<!--      <div class="breadcumb-area black-opacity bg-img-6">-->
<!--        <div class="container">-->
<!--          <div class="row">-->
<!--            <div class="col-xs-12">-->
<!--              <div class="breadcumb-wrap">-->
<!--                <h2>Blog Post</h2>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="breadcumb-menu">-->
<!--          <div class="container">-->
<!--            <div class="row">-->
<!--              <div class="col-xs-12">-->
<!--                <ul>-->
<!--                  <li><a href="index.html">Home</a></li>-->
<!--                  <li>/</li>-->
<!--                  <li><a href="blog.html">Blog</a></li>-->
<!--                  <li>/</li>-->
<!--                  <li>Blog Post</li>-->
<!--                </ul>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <!-- breadcumb-area end -->

      <!-- blog-details-area start -->
      <section class="blog-details-area ptb-10" style="border:0px red solid " >

        <div class="container">
          <div class="row">

            <!--- ЛЕВАЯ ПАНЕЛЬ ---->
            <div class="col-md-4 col-sm-6 col-xs-12 col" style="border:0px red solid "  >
              <aside class="left-sidebar">

                <!--- Avatar --->
                <div class="author-wrap">
                  <div class="author-img">
                    <img src="/assets/images/author.jpg" alt="" style="border-radius: 0px" >
                  </div>
                  <div class="author-info">
                    <h3>{{userName}}</h3>
                    <span>Founder of Innovate</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, molestiae.</p>
                  </div>
                </div>

                <div class="search-sidebar mb-30">
                  <form action="#">
                    <input type="text" name="search" placeholder="Search Here">
                    <button type="button" name="button"><i class="fa fa-search"></i></button>
                  </form>
                </div>

                <div class="category-wrap mb-30 user-menu">
                  <h3 class="sidebar-title">Меню</h3>
                  <ul>
                    <li><a @click="tab = 'user_info'"    >Личная информация</a></li>
                    <li><a @click="tab = 'info_details'" >Подробная информация</a></li>
                    <li><a @click="tab = 'articles'"     >Статьи</a></li>
                    <li><a @click="tab = 'photos'"       >Фотографии</a></li>
                    <li><a @click="tab = 'orders'"       >Заказы</a></li>
                  </ul>
                </div>

<!--                <div class="related-post mb-30">-->
<!--                  <h3 class="sidebar-title">Related Postt</h3>-->
<!--                  <ul>-->
<!--                    <li class="related-post-items">-->
<!--                      <div class="post-img">-->
<!--                        <img src="assets/images/post/1.jpg" alt="">-->
<!--                      </div>-->
<!--                      <div class="post-info">-->
<!--                        <a href="blog-post.html">Adipisicing dolor sit amet consectetur  elit Lorem ipsum dolor</a>-->
<!--                        <p>20/08/2017</p>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="related-post-items">-->
<!--                      <div class="post-img">-->
<!--                        <img src="assets/images/post/2.jpg" alt="">-->
<!--                      </div>-->
<!--                      <div class="post-info">-->
<!--                        <a href="blog-post.html">Sit Lorem ipsum dolor amet adipisicing elit Lorem ipsum dolor</a>-->
<!--                        <p>25/08/2017</p>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                    <li class="related-post-items">-->
<!--                      <div class="post-img">-->
<!--                        <img src="assets/images/post/3.jpg" alt="">-->
<!--                      </div>-->
<!--                      <div class="post-info">-->
<!--                        <a href="blog-post.html">Dolor sit amet consectetur adipisicing elit Lorem ipsum dolor</a>-->
<!--                        <p>30/09/2017</p>-->
<!--                      </div>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--                <div class="archive-wrap mb-30">-->
<!--                  <h3 class="sidebar-title">archive</h3>-->
<!--                  <ul>-->
<!--                    <li><a href="#">November 2017 <span class="pull-right">(25)</span></a></li>-->
<!--                    <li><a href="#">August 2017 <span class="pull-right">(25)</span></a></li>-->
<!--                    <li><a href="#">September 2017  <span class="pull-right">(25)</span></a></li>-->
<!--                    <li><a href="#">Octeber 2017 <span class="pull-right">(25)</span></a></li>-->
<!--                    <li><a href="#">December 2017  <span class="pull-right">(25)</span></a></li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--                <div class="tags-wrap">-->
<!--                  <h3 class="sidebar-title">Post Tags</h3>-->
<!--                  <ul>-->
<!--                    <li><a href="#">html</a></li>-->
<!--                    <li><a href="#">css</a></li>-->
<!--                    <li><a href="#">javascript</a></li>-->
<!--                    <li><a href="#">business</a></li>-->
<!--                    <li><a href="#">corporate</a></li>-->
<!--                    <li><a href="#">php</a></li>-->
<!--                    <li><a href="#">dolor</a></li>-->
<!--                    <li><a href="#">amet</a></li>-->
<!--                  </ul>-->
<!--                </div>-->

              </aside>
            </div>

            <!--- ПРАВАЯ ПАНЕЛЬ ---->
            <div class="col-md-8 col-xs-12">
              <div class="blog-details-wrap">

                <div class="blog-details-img">
                  <img src="/assets/images/blog/blog-details.jpg" alt="">
                </div>

                <template v-if="tab == 'info_details'" >
                  user_info_details
                </template>
                <template v-else-if="tab == 'photos'" >
                  user_photos
                </template>
                <template v-else-if="tab == 'articles'" >
                  user_articles
                </template>
                <template v-else-if="tab == 'orders'" >
                  user_orders
                </template>
                <template v-else >

                  <div class="blog-details-content">
                    <h4 style="font-style: italic">Личная информация</h4>

                    <div class="contact-wrap form-style">
                      <form action="mail.php" method="post" id="cf">
                        <div class="row">
                          <div class="col-sm-6 col-xs-12">
                            <input type="text" placeholder="Name" id="fname" name="fname">
                          </div>
                          <div class="col-sm-6 col-xs-12">
                            <input type="text" placeholder="Email" id="email" name="email">
                          </div>
                          <div class="col-xs-12">
                            <input type="text" placeholder="Subject" id="subject" name="subject">
                          </div>
                          <div class="col-xs-12">
                            <textarea class="contact-textarea" placeholder="Message" id="msg" name="msg"></textarea>
                          </div>
                          <div class="col-xs-12">
                            <button id="submit" class="cont-submit btn-contact" name="submit">SEND MESSAGE</button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="faq-form form-style">
                      <form id="cf" @submit.prevent="">
                        <div class="row">

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">
                                  <div>Имя пользователя</div>
                                  <div style="color:red; font-weight: bold; margin-left:10px;">*</div>
                                </div>
                              </div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.name" required="true" type="text" placeholder="Имя">
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">
                                  <div>Email</div>
                                  <div style="color:red; font-weight: bold; margin-left:10px;">*</div>
                                </div>
                              </div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.email" required="true" type="text" placeholder="Email">
                              </div>
                            </div>
                          </div>

                          <!--                                  <div class="col-xs-12">-->
                          <!--                                    <div class="row">-->
                          <!--                                      <div class="col-xs-4">-->
                          <!--                                        <div class="input-label">-->
                          <!--                                          <div>Пароль</div>-->
                          <!--                                          <div style="color:red; font-weight: bold; margin-left:10px;">*</div>-->
                          <!--                                        </div>-->
                          <!--                                      </div>-->
                          <!--                                      <div class="col-xs-8">-->
                          <!--                                        <input v-model="userInfo.password" required="true" type="text" placeholder="Пароль">-->
                          <!--                                      </div>-->
                          <!--                                    </div>-->
                          <!--                                  </div>-->

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">Логин</div>
                              </div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.login" type="text" placeholder="Логин">
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4">
                                <div class="input-label">Телефон</div>
                              </div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.phone" type="text" placeholder="Телефон">
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <div class="row">
                              <div class="col-xs-4"><div class="input-label">Роль</div></div>
                              <div class="col-xs-8">
                                <input v-model="userInfo.role" type="text" placeholder="Роль" disabled>
                              </div>
                            </div>
                          </div>

                          <div class="col-xs-12">
                            <span>Your Questions</span>
                            <textarea class="contact-textarea" placeholder="Questions" id="msg" name="msg"></textarea>
                          </div>

                          <div class="col-xs-12"><hr/>
                            <button id="submit"
                                    class="cont-submit btn-contact btn-style" name="submit">Сохранить
                            </button>
                          </div>

                        </div>
                      </form>
                    </div>

                    <pre>{{userInfo}}</pre>

                    <pre>{{usersList}}</pre>

                    <p>This is Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exce</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolorum aspernatur ipsam, cumque. Quod autem iste dolorem explicabo nobis neque unde, laboriosam voluptatum cupiditate quam, corrupti ipsum accusantium sed eaque!</p>
                    <blockquote >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam iure laborum natus ab, dolor, optio qui voluptatem voluptate assumenda perferendis! Officiis atque ad veniam voluptas reiciendis laborum! Nostrum in, modi.
                    </blockquote>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    <p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. </p>
                    <ul>
                      <li>Sed ut perspiciatis unde omnis</li>
                      <li>Lingues es membres del sam familie</li>
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>This is Lorem ipsum dolor sit amet</li>
                      <li>consectetur adipisicing elit</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique explicabo placeat voluptates harum incidunt fugit commodi illum ipsam porro sapiente rerum neque provident, ducimus iure, dolorum fugiat vero nam quidem architecto quae sint. Corporis cupiditate laborum eius exercitationem nesciunt quis magnam eum dolorem quo odio?</p>
                  </div>

                </template>

              </div>
            </div>

          </div>
        </div>
      </section>
      <!-- blog-details-area end -->

</page-template>
</template>

<script>
export default {

  data: () => ({
    tab: null,
    saveType: 'add',
  }),

  created() {
    this.getCurrentUserInfo()
  },

  mounted () {
    this.getUserInfo()
    this.getUsersList ()
  },

  methods: {

    save () {
      switch (this.saveType) {
        case 'add' :
          //this.addlink()
          break

        case 'update' :
          //this.updatelink()
          break
      }
    },

    saveResponseHandle (response) {
      const resp = this.saveResponse(response)
      if (resp.status) {
        alert('Успешное изменение')
      } else {
        alert('Не удалось изменить -' + resp.error)
      }
      this.afterSaveActions()
    },

    afterSaveActions () {

    },

    // reset () {
    //   let linkItem = { link: '', code: '', user_id: 0 }
    //   this.linkItem = Object.assign({}, linkItem)
    // },

    // selectLink (item) {
    //   this.linkItem = Object.assign({}, item)
    //   this.saveType = 'update'
    //   this.selectLinkId = item.link_id
    // },
    //
    // addlink () {
    //   const apiUrl = '/post/add/link'
    //   this.send(apiUrl, 'post', this.linkItem).then(this.saveResponseHandle)
    // },
    //
    // updatelink () {
    //   const apiUrl = '/post/update/link/' + this.selectLinkId
    //   this.send(apiUrl, 'put', this.linkItem).then(this.saveResponseHandle)
    // },
    //
    // deletelink (linkId) {
    //   const apiUrl = '/post/delete/link/' + linkId
    //   this.send(apiUrl, 'delete', this.linkItem).then(this.saveResponseHandle)
    // },
    //
    // getLinksByUserId () {
    //   if (!this.userId) return false
    //   const apiUrl = '/get/links/' + this.userId
    //   this.send(apiUrl).then(response => {
    //     this.userLinkItems = response.result
    //   })
    // },

  }

}
</script>

<style>

.user-menu ul li {
    cursor: pointer;
}

.input-label {
  color: #296dc1;
  font-style: italic;
  border-bottom: 1px #296dc1 solid;
  display: flex;
}

</style>
