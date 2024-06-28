import { createProfileService } from 'src/composables/profile/Job.api';
export const createProfile = async (data: any) => {
  const { fetchData } = createProfileService();
  await fetchData('profile', {}, { data })
    .then((response) => {
      if (response.ok) {
        alert('Profile was successfully created');
      }
    })
    .catch((err) => {
      alert(err);
    });
};
