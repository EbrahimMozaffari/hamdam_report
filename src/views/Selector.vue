<template>
  <v-main class="backTexture">
    <div></div>
    <v-card max-width="600" class="mx-auto mt-5">
      <v-app-bar dark color="indigo">
        <v-toolbar-title class="iranSansBold"> گزارش گیری</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>
      <v-container class="px-5 selector">
        <v-row class="mt-3">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <label v-on="on" @click="GenderAll" for="">جنسیت:</label>
            </template>
            <ul class="toolTipIcon">
              <li><v-icon>mdi-human-male mdi-light</v-icon> مرد</li>
              <li><v-icon>mdi-human-female mdi-light</v-icon> زن</li>
            </ul>
          </v-tooltip>

          <v-checkbox
            class="mt-0"
            v-model="Gender"
            color="success"
            off-icon="mdi-human-male"
            on-icon="mdi-human-male"
            value="maleReportCount"
            @change="log(Gender)"
          >
          </v-checkbox>

          <v-checkbox
            class="mt-0"
            v-model="Gender"
            color="success"
            off-icon="mdi-human-female"
            on-icon="mdi-human-female"
            value="feMaleReportCount"
            @change="log(Gender)"
          ></v-checkbox>
          <v-col cols="1" sm="1" md="1"> </v-col>
          <v-col cols="1" sm="1" md="1"> </v-col>
        </v-row>
        <v-row>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <label v-on="on" @click="HasSpecificDiseaseAll"
                >بیماری خاص:</label
              >
            </template>
            <ul class="toolTipIcon">
              <li><v-icon>mdi-check-circle mdi-light</v-icon> دارد</li>
              <li><v-icon>mdi-close-circle mdi-light</v-icon> ندارد</li>
              <li><v-icon>mdi-minus-circle mdi-light</v-icon> ثبت نشده</li>
            </ul>
          </v-tooltip>

          <v-checkbox
            class="mt-0"
            v-model="HasSpecificDisease"
            color="success"
            off-icon="mdi-check-circle"
            on-icon="mdi-check-circle"
            value="trueCount"
            @change="log(HasSpecificDisease)"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            v-model="HasSpecificDisease"
            color="success"
            off-icon="mdi-close-circle"
            on-icon="mdi-close-circle"
            value="falseCount"
            @change="log(HasSpecificDisease)"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            v-model="HasSpecificDisease"
            color="success"
            off-icon="mdi-minus-circle"
            on-icon="mdi-minus-circle"
            value="nullCount"
            @change="log(HasSpecificDisease)"
          ></v-checkbox>
          <span class="percent" v-if="HasSpecificDiseasePercent"
            >{{ HasSpecificDiseasePercent }} %</span
          >
        </v-row>
        <v-row>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <label v-on="on" @click="IncomeLevelAll" for=""
                >سطح درآمد :</label
              >
            </template>
            <ul class="toolTipIcon">
              <li v-for="item in 10" :key="item">
                <v-icon
                  v-html="`mdi-numeric-${item}-circle mdi-light`"
                ></v-icon>
                {{ incomeItems[item - 1] }}
              </li>
            </ul>
          </v-tooltip>

          <v-checkbox
            v-for="index in 10"
            :key="index"
            class="mt-0"
            v-model="IncomeLevel"
            color="success"
            :off-icon="`mdi-numeric-${index}-circle`"
            :on-icon="`mdi-numeric-${index}-circle`"
            :value="`${incomItemsValue[index - 1]}`"
            @change="log(IncomeLevel)"
          ></v-checkbox>
          <span class="percent" v-if="IncomeLevelPercent"
            >{{ IncomeLevelPercent }} %</span
          >
        </v-row>
        <v-row>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <label v-on="on" @click="JobStatusAll" for="">وضعیت شغلی :</label>
            </template>
            <ul class="toolTipIcon">
              <li><v-icon>mdi-minus-circle mdi-light</v-icon> اهمیتی ندارد</li>
              <li><v-icon>mdi-close-circle mdi-light</v-icon> بیکار</li>
              <li><v-icon>mdi-home-circle mdi-light</v-icon> خانه دار</li>
              <li><v-icon>mdi-account-hard-hat mdi-light</v-icon> شاغل</li>
              <li><v-icon>mdi-hiking mdi-light</v-icon> بازنشسته</li>
            </ul>
          </v-tooltip>

          <v-checkbox
            class="mt-0"
            v-model="JobStatus"
            color="success"
            off-icon="mdi-minus-circle"
            on-icon="mdi-minus-circle"
            value="notImportant"
            @change="log(JobStatus)"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            v-model="JobStatus"
            color="success"
            off-icon="mdi-close-circle"
            on-icon="mdi-close-circle"
            value="unemployed"
            @change="log(JobStatus)"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            v-model="JobStatus"
            color="success"
            off-icon="mdi-home-circle"
            on-icon="mdi-home-circle"
            value="housewife"
            @change="log(JobStatus)"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            v-model="JobStatus"
            color="success"
            off-icon="mdi-account-hard-hat"
            on-icon="mdi-account-hard-hat"
            value="employed"
            @change="log(JobStatus)"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            v-model="JobStatus"
            color="success"
            off-icon="mdi-hiking"
            on-icon="mdi-hiking"
            value="retired"
            @change="log(JobStatus)"
          ></v-checkbox>
          <span class="percent" v-if="JobStatusPercent"
            >{{ JobStatusPercent }} %</span
          >
          <!-- mdi-human-wheelchair -->
        </v-row>
      </v-container>
    </v-card>
  </v-main>
</template>

<script>
export default {
  name: "Selector",
  data: () => ({
    val: false,
    status: true,
    status2: false,
    Gender: [],
    HasSpecificDisease: [],
    HasSpecificDiseasePercent: 0,
    IncomeLevel: [],
    IncomeLevelPercent: 0,
    JobStatus: [],
    JobStatusPercent: 0,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
    incomItemsValue:[
      "noIncome",
      "lessThanOneMillion",
      "oneMillionToTwoMillion",
      "twoMillionToFourMillion",
      "fourMillionToEightMillion",
      "eightMillionToTwelveMillion",
      "twelveMillionToSixteenMillion",
      "sixteenMillionToTwentyFiveMillion",
      "twentyFiveMillionToFiftyMillion",
      "moreThanFiftyMillion"
    ],
    incomeItems: [
      "در حال حاظر درآمدی ندارم",
      "کمتر از یک میلیون تومان",
      "بیش از یک میلیون تا دو میلیون تومان",
      "بیش از دو میلیون تا چهار میلیون تومان",
      "بیش از چهار میلیون تا هشت میلیون تومان",
      "بیش از هشت میلیون تا دوازده میلیون تومان",
      "بیش از دوازده میلیون تا شانزده میلیون تومان",
      "بیش از شانزده میلیون تا بیست و پنج میلیون تومان",
      "بیش از بیست و پنج میلیون تا پنجاه میلیون تومان",
      "بیش از پنجاه میلیون تومان",
    ],
  }),
  methods: {
    log(val) {
      if (val) {
        console.log(val);
      }

      let data = this.$store.state.app.hamdamData;
      let total = this.$store.getters["app/getTotalCount"];
      let malePercent = this.$store.getters["app/getMalePercent"];
      let femalePercent = this.$store.getters["app/getFemalePercent"];

      console.log("total", total);
      console.log(
        "malePercent",
        Math.round(malePercent * 100) / 100,
        Math.round(femalePercent * 100) / 100
      );
      let totalSelect = 0;
      let totalHasSpecificDisease = 0;
      let totalIncomeLevel = 0;
      let totalJobStatus = 0;
      this.Gender.forEach((element) => {
        if (element == "maleReportCount") {
          totalSelect += data[element]["maleCount"];
        } else {
          totalSelect += data[element]["feMaleCount"];
        }

        let dataMaleOrFemal = element;
        this.HasSpecificDisease.forEach((element) => {
          // let datahasSpecific = element;
          totalHasSpecificDisease +=data[dataMaleOrFemal]["factorsReport"]["hasSpecificDiseaseReportCount"][element];
          // console.log(
          //   'data[dataMaleOrFemal]["factorsReport"]',
          //   data[dataMaleOrFemal]["factorsReport"][
          //     "hasSpecificDiseaseReportCount"
          //   ]["falseCount"]
          // );
//console.log("HasSpecificDisease",  data[dataMaleOrFemal]["factorsReport"]["hasSpecificDiseaseReportCount"][datahasSpecific]);

          // let newArray = data[dataMaleOrFemal]["factorsReport"][
          //   "hasSpecificDiseaseReportCount"
          // ].filter((el) => {
          //   return el[datahasSpecific] !== undefined;
          // });
          // console.log("HasSpecificDisease", newArray[0][datahasSpecific]);
          // totalHasSpecificDisease += newArray[0][datahasSpecific];
        }); //end of HasSpecificDisease

        this.IncomeLevel.forEach((element) => {
          totalIncomeLevel += data[dataMaleOrFemal]["factorsReport"]["incomeLevelReportCount"][element]
          // let dataIncomeLevel = element;
          // let newArray = data[dataMaleOrFemal]["factors"][1][
          //   "IncomeLevel"
          // ].filter((el) => {
          //   return el[dataIncomeLevel] !== undefined;
          // });
          // console.log("IncomeLevel", newArray[0][dataIncomeLevel]);
          // totalIncomeLevel += newArray[0][dataIncomeLevel];
        }); //end of IncomeLevel

        this.JobStatus.forEach((element) => {
           totalJobStatus += data[dataMaleOrFemal]["factorsReport"]["jobStatusReportCount"][element]
          // let dataJobStatus = element;
          // let newArray = data[dataMaleOrFemal]["factors"][2][
          //   "JobStatus"
          // ].filter((el) => {
          //   return el[dataJobStatus] !== undefined;
          // });
          // if (newArray !== undefined) {
          //   console.log("totalJobStatus", newArray[0][dataJobStatus]);
          //   totalJobStatus += newArray[0][dataJobStatus];
          // }
        }); //end of dataJobStatus

        //console.log(data[element]['count']);
      }); //end of Gender
      console.log("totalSelect", totalSelect);
      console.log("totalHasSpecificDisease", totalHasSpecificDisease);
      console.log("totalIncomeLevel", totalIncomeLevel);
      console.log("totalJobStatus", totalJobStatus);
      this.HasSpecificDiseasePercent =
        Math.round(((totalHasSpecificDisease * 100) / totalSelect) * 100) / 100;

      this.IncomeLevelPercent =
        Math.round(((totalIncomeLevel * 100) / totalSelect) * 100) / 100;

      this.JobStatusPercent =
        Math.round(((totalJobStatus * 100) / totalSelect) * 100) / 100;
    },
    GenderAll() {
      this.Gender = ["maleReportCount", "feMaleReportCount"];
      this.log();
    },
    HasSpecificDiseaseAll() {
      this.HasSpecificDisease = ["trueCount", "nullCount", "falseCount"];
      this.log();
    },
    IncomeLevelAll() {
      this.IncomeLevel = this.incomItemsValue;
      this.log();
    },
    JobStatusAll() {
      this.JobStatus = ["notImportant", "unemployed", "housewife", "employed", "retired"];
      this.log();
    },
  },
  mounted() {
    // HAD TO ADD THIS CODE FOR IT TO WORK
    //let data = this.$store.state.app.hamdamData;
    //console.log("HamdamData", data.male);
    this.$store.dispatch("app/fetchHamdamData");
    // if (data.length == 0) {
    //   this.$store.dispatch("app/fetchHamdamData");
    // }
  },
  computed: {
    hamdamData() {
      let data = this.$store.getters["app/getHamdamData"];
      console.log("data", data);
      return data;
    },
  },
  /*
          // data[dataMaleOrFemal]["factors"][0]["HasSpecificDisease"].forEach(element => {
          //   console.log("HasSpecificDisease",element[datahasSpecific]);
          // });
         //console.log("HasSpecificDisease",data[dataMaleOrFemal]["factors"][0]["HasSpecificDisease"]);
  */
};
</script>

<style lang="scss">
.backTexture {
  // overflow: hidden;
  // padding: 20px 25px;
  // padding-top: 25px;
  // background: #F5F5F5;
  background: #f5f5f5 url(/img/bg1.png);
  // border-top:none;
}

.toolTipIcon {
  list-style-type: none;
}
.toolTipIcon li {
  font-family: IRANSansWeb-FaNum-Bold !important;
}
.selector label {
  cursor: pointer;
}
.selector .percent {
  line-height: 2;
  margin-right: 10px;
}
//  @import '~pretty-checkbox/src/pretty-checkbox.scss';
</style>
