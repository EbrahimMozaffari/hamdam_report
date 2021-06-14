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

          /*
          // data[dataMaleOrFemal]["factors"][0]["HasSpecificDisease"].forEach(element => {
          //   console.log("HasSpecificDisease",element[datahasSpecific]);
          // });
         //console.log("HasSpecificDisease",data[dataMaleOrFemal]["factors"][0]["HasSpecificDisease"]);
  */

        /*
      محاسبه تک تک هر قسمت 
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

        }); //end of IncomeLevel

        this.JobStatus.forEach((element) => {
           totalJobStatus += data[dataMaleOrFemal]["factorsReport"]["jobStatusReportCount"][element]

        }); //end of dataJobStatus

        //console.log(data[element]['count']);
      }); //end of Gender
      // console.log("totalSelect", totalSelect);
      // console.log("totalHasSpecificDisease", totalHasSpecificDisease);
      // console.log("totalIncomeLevel", totalIncomeLevel);
      // console.log("totalJobStatus", totalJobStatus);
      this.HasSpecificDiseasePercent =
        Math.round(((totalHasSpecificDisease * 100) / totalSelect) * 100) / 100;

      this.IncomeLevelPercent =
        Math.round(((totalIncomeLevel * 100) / totalSelect) * 100) / 100;

      this.JobStatusPercent =
        Math.round(((totalJobStatus * 100) / totalSelect) * 100) / 100;

        */