<template>
  <div class="custom-textarea" :style="cssVars">
    <v-textarea
      v-model="currentValue"
      :name="name"
      filled
      :label="label"
      auto-grow
      clearable
      :rules="rules"
      :rows="rows"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      required: false,
      default: 'Textarea',
      type: String,
    },
    name: {
      required: false,
      default: 'textarea',
      type: String,
    },
    rows: {
      required: false,
      type: Number,
      default: 3,
    },
    rules: {
      required: false,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  computed: {
    cssVars() {
      return {
        '--rows': this.rows,
      }
    },
  },
  watch: {
    currentValue(newValue) {
      this.$emit('input', newValue)
    },
  },
}
</script>

<style lang="scss">
$html-font-size: 16px;
$line-height: 1.3rem;
$rows: 4;

@function stripUnit($value) {
  @return $value / ($value * 0 + 1);
}
@function remtopx($remValue) {
  @return stripUnit($remValue) * stripUnit($html-font-size) * 1px;
}
.custom-textarea {
  .v-textarea {
    textarea {
      line-height: $line-height;
      transition: all 0.2s ease-in-out;
    }
    &.v-input--is-focused {
      textarea {
        min-height: $rows * remtopx($line-height) !important;
      }
    }
  }
}
</style>
