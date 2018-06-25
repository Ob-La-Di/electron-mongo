<template>
  <v-layout row wrap id="wrapper">
    <v-flex xs12>
      <v-card>
        <v-card-title class="headline">
          <v-layout>
            <v-flex xs10>Connections</v-flex>
            <v-flex xs2 class="text-sm-right">
              <v-btn flat icon color="white" @click.prevent="addConnection">
                <v-icon>add_box</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        </v-card-text>
        <v-layout row wrap class="pa-3">
          <v-flex xs12 left v-for="(connection, index) in connections" :key="index">
            <div class="connection" @dblclick="connect(connection)">{{ connection.name }}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <add-connection :display="displayAddConnectionScreen"></add-connection>
  </v-layout>
</template>

<script>
  import AddConnection from './AddConnection';
  import { getConnections, connect } from '../../services/connections.service';
  export default {
    name: 'welcome',
    components: { AddConnection },
    data() {
      return {
        connections: getConnections(this.$electron.remote.app.getPath('userData')),
        db: null,
        displayAddConnectionScreen: false,
      };
    },
    methods: {
      async connect(connection) {
        try {
          this.db = await connect(`mongodb://${connection.ip}:${connection.port}`);
          console.log(this.db);
        } catch (e) {
          console.log(e);
        }
      },

      addConnection() {
        this.displayAddConnectionScreen = true;
      },
    },
  };
</script>

<style scoped>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
  .value
  {
    display: inline;
    font-style: italic;
    font-weight: 600;
    font-size: 18px;
    padding-left: 5px;
  }
  .connection {
    cursor: pointer;
  }
</style>
