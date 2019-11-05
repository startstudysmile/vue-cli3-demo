import TopNav from './TopNav/index.vue'
import MenuNav from './MenuNav/index.vue'
import Contanier from './Container/index.vue'
import RouteNav from './RouteNav/index.vue'
import TabTemplate from './TabTemplate/index.vue'
import Card from './Card/index.vue'
import StepCard from './StepCard/index.vue'
import Tips from './Tips/index.vue'

let components = [TopNav, MenuNav, Contanier, RouteNav, TabTemplate, Card, StepCard, Tips]

components.forEach(component => {
  component.install = function(Vue) {
    Vue.component(this.name, this)
  }
})

export default Vue => {
  components.forEach(Component => {
    Vue.use(Component)
  })
}
