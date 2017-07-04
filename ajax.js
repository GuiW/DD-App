var actionComp = Vue.extend({
  template: '#action-template',
  props:['actions'],
  data: function() {
    return {
      counter: 0
    }
  },
  methods : {
    RollTheDice(){
      this.rollResult += 1;
    }
  }
})

var app = new Vue({
  el: "#app",
  data: {
    monsters: "",
    monsterURL: "",
    the_monster:{},
    loading: false,
  },

  components: {
      'action': actionComp
  },

  mounted(){
    let self = this;
    $.getJSON("http://www.dnd5eapi.co/api/monsters", function(data){
      self.monsters = data.results;
    })
  },

  methods: {
    getAjaxRequest(){
      let self = this;

      $.getJSON(this.monsterURL, function(data){
        self.the_monster = data;
        self.loading = true;
      })
    }
  }
})