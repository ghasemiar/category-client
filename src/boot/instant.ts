import { boot } from 'quasar/wrappers';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import InstantSearch from 'vue-instantsearch/vue3/es';
export default boot(({ app }) => {
  app.use(InstantSearch);
});
