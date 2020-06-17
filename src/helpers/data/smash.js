import birthdayData from './birthdayData';
import userData from './userData';

const getBirthdaysWithGuestsOfHonor = (creatorUid) => new Promise((resolve, reject) => {
  birthdayData.getBirthdaysByCreatorUid(creatorUid).then((birthdays) => {
    userData.getUsers().then((users) => {
      const finalBirthdays = [];
      birthdays.forEach((birthday) => {
        const thisBirthday = { guestOfHonor: '', ...birthday };
        const guestOfHonor = users.find((user) => user.uid === thisBirthday.guestOfHonorUid);
        thisBirthday.guestOfHonor = guestOfHonor.displayName;
        finalBirthdays.push(thisBirthday);
      });
      resolve(finalBirthdays);
    });
  })
    .catch((err) => reject(err));
});

export default { getBirthdaysWithGuestsOfHonor };
