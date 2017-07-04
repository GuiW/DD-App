var actionComp = Vue.extend({
  template: '#action-template',
  props:['actions'],
  data: function() {
    return {
      rollResult: ""
    }
  },
  methods : {
    RollTheDice(atck_bonus, dmg_dice, dmg_bonus){
      let self = this;

      var the_action = event.currentTarget.parentNode;

      var Rolling = function(multiplier,dice) {
        return multiplier * Math.floor((Math.random() * dice) + 1);
      }

      var nbrs = dmg_dice.match(/\d+/g);

      var nbDices01 = nbrs[0];
      var dice01 = nbrs[1];
      var nbDices02 = nbrs[2];
      var dice02 = nbrs[3];

      if (nbDices02) {
        var res = Rolling(nbDices01, dice01) + " + " + Rolling(nbDices02, dice02);
        console.log(dmg_dice + " = " + res)
      }

      else {
        var res = Rolling(nbDices01, dice01);
        console.log(res)
        var text = "<div>" + dmg_dice + " = " + res + "</div>";
        self.rollResult = text;
      }
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