<template>
  <div>
    <b-table
      hover
      :items="items"
      :fields="fields"
      label-sort-asc=""
      label-sort-desc=""
      label-sort-clear="">
      <template #thead-top>
        <button
          class="btn btn-light"
          type="button"
          @click="sortByDefault"
          value="toDefault">
          По умолчанию
        </button>
      </template>
      <template #head(name)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByName"
          value="nameIncrease">
          {{ fields.label }}
        </button>
      </template>
      <template #head(gender)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByGender"
          value="genderIncrease">
          {{ fields.label }}
        </button>
      </template>
      <template #head(age)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByAge"
          value="ageIncrease">
          {{ fields.label }}
        </button>
      </template>
      <template #head(phone)="fields">
        <button
          class="btn btn-light"
          type="button"
          @click="sortByPhone"
          value="phoneIncrease">
          {{ fields.label }}
        </button>
      </template>

      <template #cell(name)="items"> {{ items.item.levelChild }}{{ items.item.name }} </template>
      <template #cell(gender)="items">
        {{ items.item.gender }}
      </template>
      <template #cell(age)="items">
        {{ items.item.age }}
      </template>
      <template #cell(phone)="items">
        {{ items.item.phone }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "employee-table",
  components: {},
  data() {
    return {
      fields: [
        { key: "name", label: "Имя" },
        { key: "gender", label: "Пол" },
        { key: "age", label: "Возраст" },
        { key: "phone", label: "Телефон" },
      ],
      sort: "",
      items: this.$store.state.employeesData,
    };
  },
  computed: {},
  methods: {
    sortByName(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "nameIncrease") {
        this.items = this.$store.getters.sortByName([1, -1]);
        event.target.value = "nameDecrease";
      } else if (buttonValue === "nameDecrease") {
        this.items = this.$store.getters.sortByName([-1, 1]);
        event.target.value = "nameIncrease";
      }
    },
    sortByGender(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "genderIncrease") {
        this.items = this.$store.getters.sortByGender([1, -1]);
        event.target.value = "genderDecrease";
      } else if (buttonValue === "genderDecrease") {
        this.items = this.$store.getters.sortByGender([-1, 1]);
        event.target.value = "genderIncrease";
      }
    },
    sortByAge(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "ageIncrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([1, -1], "age");
        event.target.value = "ageDecrease";
      } else if (buttonValue === "ageDecrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([-1, 1], "age");
        event.target.value = "ageIncrease";
      }
    },
    sortByPhone(event) {
      const buttonValue = event.target.value;
      if (buttonValue === "phoneIncrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([1, -1], "phone");
        event.target.value = "phoneDecrease";
      } else if (buttonValue === "phoneDecrease") {
        this.items = this.$store.getters.sortByAgeOrPhone([-1, 1], "phone");
        event.target.value = "phoneIncrease";
      }
    },
    sortByDefault() {
      this.items = this.$store.state.employeesData;
    },
  },
};
</script>

<style lang="sass" scoped></style>
