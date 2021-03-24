<template>
  <PageTemplate>

    <div style="">

      <div style="display: block">

        <img src="assets/images/fon/fon-6.jpg" alt="" style="position: relative; margin-bottom: 20px; width: 60%; float:left">

        <div class="universal_component_wrapper universal_component_wrapper_tablet_block"
             style="margin-left:20px; width: 38%; text-align: justify; float: right">

            <div class="universal_component_content universal_component_content_3_4">

              <div class="html_text content is-paddingless"><p class="accent">SOLID — это&nbsp;аббревиатура пяти основных
                принципов проектирования в&nbsp;объектно-ориентированном программировании — Single responsibility, <span
                  class="nowrap">Open-closed,</span> Liskov substitution, Interface segregation и&nbsp;Dependency
                inversion. В&nbsp;переводе на&nbsp;русский: принципы единственной ответственности, открытости /
                закрытости, подстановки Барбары Лисков, разделения интерфейса и&nbsp;инверсии зависимостей)</p>
                <p>Аббревиатура SOLID была предложена Робертом Мартином, автором нескольких книг, широко известных в&nbsp;сообществе
                  разработчиков. Эти принципы позволяют строить на&nbsp;базе ООП масштабируемые и&nbsp;сопровождаемые
                  программные продукты с&nbsp;понятной <span class="nowrap">бизнес-логикой.</span></p>
                <p><strong>Расшифровка:</strong></p>
                <ul>
                  <li>Single responsibility — принцип единственной ответственности</li>
                  <li>Open-closed — принцип открытости / закрытости</li>
                  <li>Liskov substitution — принцип подстановки Барбары Лисков</li>
                  <li>Interface segregation — принцип разделения интерфейса</li>
                  <li>Dependency inversion — принцип инверсии зависимостей</li>
                </ul>
                <p><strong>Принцип единственной обязанности / ответственности</strong> (single responsibility principle /
                  SRP) обозначает, что&nbsp;каждый объект должен иметь одну обязанность и&nbsp;эта обязанность должна быть
                  полностью инкапсулирована в&nbsp;класс. Все его сервисы должны быть направлены исключительно на&nbsp;обеспечение
                  этой обязанности. <a href="/articles/solid_the_single_responsibility_principle">Подробнее про&nbsp;SRP...</a>
                </p>
                <p><strong>Принцип открытости / закрытости</strong> <span class="nowrap">(open-closed</span> principle /
                  OCP) декларирует, что&nbsp;программные сущности (классы, модули, функции и&nbsp;т. п.) должны быть
                  открыты для&nbsp;расширения, но&nbsp;закрыты для&nbsp;изменения. Это&nbsp;означает, что&nbsp;эти
                  сущности могут менять свое поведение без&nbsp;изменения их исходного кода. <a
                    href="/articles/solid_the_open_closed_principle">Подробнее про&nbsp;OCP...</a></p>
                <p><strong>Принцип подстановки Барбары Лисков</strong> (Liskov substitution principle / LSP) в&nbsp;формулировке
                  Роберта Мартина: «функции, которые используют базовый тип, должны иметь возможность использовать подтипы
                  базового типа не&nbsp;зная об&nbsp;этом». <a href="/articles/solid_the_liskov_substitution_principle">Подробнее
                    про&nbsp;LSP...</a></p>
                <p><strong>Принцип разделения интерфейса</strong> (interface segregation principle / ISP) в&nbsp;формулировке
                  Роберта Мартина: «клиенты не&nbsp;должны зависеть от&nbsp;методов, которые они не&nbsp;используют».
                  Принцип разделения интерфейсов говорит о&nbsp;том, что&nbsp;слишком «толстые» интерфейсы необходимо
                  разделять на&nbsp;более маленькие и&nbsp;специфические, чтобы клиенты маленьких интерфейсов знали только
                  о&nbsp;методах, которые необходимы им в&nbsp;работе. В&nbsp;итоге, при&nbsp;изменении метода интерфейса
                  не&nbsp;должны меняться клиенты, которые этот метод не&nbsp;используют. <a
                    href="/articles/solid_the_interface_segregation_principle">Подробнее про&nbsp;ISP...</a></p>
                <p><strong>Принцип инверсии зависимостей</strong> (dependency inversion principle / DIP) — модули верхних
                  уровней не&nbsp;должны зависеть от&nbsp;модулей нижних уровней, а&nbsp;оба типа модулей должны зависеть
                  от&nbsp;абстракций; сами абстракции не&nbsp;должны зависеть от&nbsp;деталей, а&nbsp;вот детали должны
                  зависеть от&nbsp;абстракций. <a href="/articles/solid_the_dependency_inversion_principle">Подробнее про&nbsp;DIP...</a>
                </p></div>

                <div>Статья позаимствована с сайта <a href="https://web-creator.ru/articles/solid">https://web-creator.ru/articles/solid</a></div>

            </div>
        </div>

      </div><div style="clear: both"></div>

      <hr/>

      <div style="display: flex">

        <div class="html_text content is-paddingless" style="width: 38%; float:left; text-align: justify" >
            <p class="accent">Принцип инверсии зависимостей — The&nbsp;Dependency
            Inversion Principle или&nbsp;DIP — один из&nbsp;пяти основных принципов объектно-ориентированного
            программирования и&nbsp;проектирования, сформулированных Робертом Мартином.</p>
            <p>Принцип декларирует, что&nbsp;модули верхних уровней не&nbsp;должны зависеть от&nbsp;модулей нижних
              уровней, а&nbsp;оба типа модулей должны зависеть от&nbsp;абстракций; сами абстракции не&nbsp;должны зависеть
              от&nbsp;деталей, а&nbsp;вот детали должны зависеть от&nbsp;абстракций.</p>
            <p>Следование принципу инверсии зависимостей «заставляет» реализовывать высокоуровневые компоненты без&nbsp;встраивания
              зависимостей от&nbsp;конкретных низкоуровневых классов, что, например, сильно упрощает замену используемых
              зависимостей как по&nbsp;<span class="nowrap">изнес-требованиям,</span> так и&nbsp;для&nbsp;целей
              тестирования. При&nbsp;этом зависимость формируется не&nbsp;от&nbsp;конкретной реализации, а&nbsp;от&nbsp;абстракции
              — реализуемого зависимостью интерфейса.</p>
            <p>Например, мы реализуем хранение документов в&nbsp;<span class="nowrap">веб-приложении.</span> На&nbsp;первый
              взгляд, кажется логичным добавить зависимость от&nbsp;модулей работы с&nbsp;файловой системой
              непосредственно в&nbsp;класс, отвечающий за&nbsp;высокоуровневую работу с&nbsp;этими документами. Но&nbsp;в&nbsp;перспективе
              такая зависимость может создать проблемы — например, нам потребуется хранить данные не&nbsp;только на&nbsp;диске,
              но&nbsp;и&nbsp;в&nbsp;облаке. Если зависимость внедрена от&nbsp;реализации, то&nbsp;мы столкнёмся с&nbsp;необходимостью
              её переработки. Если же зависимость выведена на&nbsp;уровень абстракции (интерфейса), то&nbsp;нам будет
              достаточно реализовать функционал работы с&nbsp;облаком, соответствующий ранее созданному интерфейсу работы
              с&nbsp;файлами.</p>
            <p>Принцип инверсии зависимостей часто упрощает следованию принципу подстановки Барбары Лисков. Выделение
              абстракций и&nbsp;встраивание зависимостей от&nbsp;них снижает вероятность того, что&nbsp;в&nbsp;новом
              классе мы не&nbsp;полностью реализуем контракт базового класса, который мы расширяем в&nbsp;рамках
              нового.</p>
        </div>

        <img src="assets/images/fon/fon-11.jpg" style="width: 60%;position: relative; margin-bottom: 20px; margin-left: 20px; float: right">

      </div><div style="clear: both"></div>

    </div>

  </PageTemplate>
</template>
<script>
import UserProfile from '@/pages/UserProfile'
import PageTemplate from '@/components/app/PageTemplate'

export default {
  name: 'Home',
  components: {
    PageTemplate, UserProfile
  }
}
</script>
