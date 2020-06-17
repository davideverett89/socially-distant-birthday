import birthdayData from './birthdayData';
import userData from './userData';
import userContributorData from './userContributorData';

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

const getInvitedBirthdaysByUserUid = (userUid) => new Promise((resolve, reject) => {
  userData.getUserByUid(userUid).then((user) => {
    const currentUser = user[0];
    const userId = currentUser.id;
    userContributorData.getUserContributorsByUserId(userId).then((userContributors) => {
      birthdayData.getBirthdays().then((birthdays) => {
        userData.getUsers().then((users) => {
          const finalBirthdays = [];
          userContributors.forEach((singleUC) => {
            const invitedBirthday = birthdays.find((birthday) => birthday.id === singleUC.birthdayId);
            const guestOfHonor = users.find((x) => x.uid === invitedBirthday.guestOfHonorUid);
            invitedBirthday.guestOfHonor = guestOfHonor.displayName;
            finalBirthdays.push(invitedBirthday);
          });
          resolve(finalBirthdays);
        });
      });
    });
  })
    .catch((err) => reject(err));
});

export default { getBirthdaysWithGuestsOfHonor, getInvitedBirthdaysByUserUid };
