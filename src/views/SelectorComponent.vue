<template>
  <tr class="borderbottom">
    <td>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <label @click="selectAll" v-on="on" for=""
            >{{ selectorData.title }} :</label
          >
        </template>
        <ul class="toolTipIcon">
          <li v-for="(item, index) in selectorData.names" :key="index">
            <v-icon v-html="`${selectorData.icons[index]} mdi-light`"></v-icon>
            {{ selectorData.names[index] }}
          </li>
        </ul>
      </v-tooltip>
    </td>
    <td class="d-inline-flex">
      <v-checkbox
        v-for="(item, index) in selectorData.names"
        :key="index"
        class="mt-0"
        v-model="dataModel"
        color="success"
        :off-icon="`${selectorData.icons[index]}`"
        :on-icon="`${selectorData.icons[index]}`"
        :value="`${selectorData.values[index]}`"
        @change="over(dataModel)"
      ></v-checkbox>
    </td>
    <td>
      <span
        class="d-inline-flex percent"
        v-if="allDataModel[selectorData.dataModelName]"
      >
        <v-icon color="indigo">mdi-human-female</v-icon>
        <span v-if="femalePercent" class="iranSansBold girl"
          >{{ femalePercent }} %</span
        >
        <span v-if="femaleCount" class="iranSansBold girl mr-1">
          {{ femaleCount }} نفر
        </span>
        <span
          v-if="minusePercent.currentNewDataName == selectorData.dataModelName"
        >
          <v-sheet
            v-if="minusePercent.women"
            :class="minusePercent.women > 0 ? 'green' : 'red'"
            class="rounded-circle mt-1"
            elevation="2"
            :height="
              minusePercent.women > 0
                ? minusePercent.women
                : -minusePercent.women
            "
            :width="
              minusePercent.women > 0
                ? minusePercent.women
                : -minusePercent.women
            "
          ></v-sheet>
        </span>
        <v-icon color="indigo">mdi-human-male </v-icon>
        <span v-if="malePercent" class="iranSansBold boy"
          >{{ malePercent }} %</span
        >
        <span v-if="maleCount" class="iranSansBold boy mr-1">
          {{ maleCount }} نفر
        </span>
        <span
          v-if="minusePercent.currentNewDataName == selectorData.dataModelName"
        >
          <v-sheet
            v-if="minusePercent.men"
            :class="minusePercent.men > 0 ? 'green' : 'red'"
            class="rounded-circle mt-1"
            elevation="2"
            :height="
              minusePercent.men > 0 ? minusePercent.men : -minusePercent.men
            "
            :width="
              minusePercent.men > 0 ? minusePercent.men : -minusePercent.men
            "
          ></v-sheet>
        </span>
      </span>
    </td>
    <!-- <td v-if="minusePercent.currentNewDataName == selectorData.dataModelName">
      <span v-if="minusePercent.men">
  
        <v-sheet
          :class="minusePercent.men > 0 ? 'green' : 'red'"
          class="rounded-circle"
          elevation="2"
          :height="minusePercent.men"
          :width="minusePercent.men"
        ></v-sheet>
      </span>
      _
      <span v-if="minusePercent.women">{{ minusePercent.women }}</span>
     
    </td> -->
  </tr>
</template>

<script>
export default {
  name: "SelectorComponent",
  props: ["selectorData"],
  data() {
    return {
      dataModel: [],
      malePercent: null,
      femalePercent: null,
      maleCount: null,
      femaleCount: null,
    };
  },
  methods: {
    over(val) {
      this.sendSingleData();
      this.$emit("over", {
        dataModelName: this.selectorData.dataModelName,
        value: val,
      });
    },
    selectAll() {
      this.dataModel = [];
      this.selectorData.values.forEach((element) => {
        this.dataModel.push(element);
      });
      this.sendSingleData();
      this.$emit("over", {
        dataModelName: this.selectorData.dataModelName,
        value: this.dataModel,
      });
    },
    sendSingleData() {
      //this.dataModel
      this.$store.dispatch("app/sendSingleData", {
        dataModelName: this.selectorData.dataModelName,
        value: this.dataModel,
      });
    },
  },
  computed: {
    allDataModel() {
      let data = this.$store.getters["app/getAllDataModel"];
      var totalSelectFemale = 0;
      var totalSelectmale = 0;
      var totalfullcount = 0;
      if (data) {
        this.dataModel.forEach((element) => {
          //let dataValue = element;
          if (data[this.selectorData.dataModelName]) {
            let newfilter = data[
              this.selectorData.dataModelName
            ].data.factors.filter((el) => {
              if (el["value"] == element) {
                //console.log("el", el);
                return el;
              } else if (element == "null") {
                //console.log("element", element);
                return el["value"] == undefined;
              }
            });
            //console.log("newfilter", newfilter);
            totalSelectFemale += newfilter[0].femaleCount;
            totalSelectmale += newfilter[0].maleCount;
            totalfullcount = newfilter[0].totalFullCount;
          }
        }); //end of HasSpecificDisease

        this.maleCount = totalSelectmale;
        this.femaleCount = totalSelectFemale;
        this.malePercent =
          Math.round(((totalSelectmale * 100) / totalfullcount) * 100) / 100;

        this.femalePercent =
          Math.round(((totalSelectFemale * 100) / totalfullcount) * 100) / 100;
      }
      return data;
    },

    minusePercent() {
      let data = this.$store.getters["app/getPercenData"];
      let dataName = this.$store.getters["app/getPercenDataName"];
      //console.log("minusePercent", data);
      var men = 0;
      var women = 0;
      if (data.newPercent.men) {
        men =
          Math.round((data.newPercent.men - data.oldPercent.men) * 100) / 100;
      }
      if (data.newPercent.women) {
        women =
          Math.round((data.newPercent.women - data.oldPercent.women) * 100) /
          100;
      }
      return {
        currentNewDataName: dataName.currentNewDataName,
        men: men,
        women: women,
      };
    },
  },
};
</script>

<style>
.girl,
.boy {
  padding: 4px;
  border-radius: 5px;
  font-size: 13px;
}
.girl {
  background: #dfc1ff;
}
.boy {
  background: #bbc5ff;
}
.borderbottom {
  border-bottom: solid 1px lightgray;
}
.dot {
  /* height: 25px;
  width: 25px; */
  border-radius: 50%;
  display: inline-block;
}
.red {
  background-color: rgb(255, 0, 0);
}
</style>