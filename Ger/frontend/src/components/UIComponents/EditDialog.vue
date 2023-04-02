<template>
    <v-row justify="center" v-if="show">
      <v-dialog
        v-model="dialog"
        persistent
        width="1024"
      >
        <v-card>
          <v-card-title>
            <span class="text-h6">editing...</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="todo description"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

<script>
export default {
  name: 'EditDialog',
  data: () => ({
    dialog: true,
  }),
  props: {
    show: {
        type: Boolean,
        default: false
    }
  }
}
</script>