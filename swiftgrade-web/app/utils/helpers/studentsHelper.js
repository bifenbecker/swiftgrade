import _ from 'lodash';

export const updateStudents = (data, studentsData) => {
  const students = _.cloneDeep(studentsData);
  const index = students.findIndex(student => student.user_id === data.id);
  if (index >= 0) {
    students[index] = {
      ...students[index],
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
    };
  }
  return students;
};

export const updateStudentsAfterDeleting = (group, students, data) => {
  const newStudents = students.filter(s => !data.students_ids.includes(s.user_id));
  _.set(group, 'students_count', newStudents.length);
  return { group, students: newStudents };
};

const getRandomSymbol = alphabet => alphabet[Math.floor(Math.random() * alphabet.length)];

const shuffle = array => {
  array.sort(() => Math.random() - 0.5);
};

export const generatePassword = () => {
  const randomUppercaseLetter = getRandomSymbol('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const randomDigit = getRandomSymbol('0123456789');
  const randomSpecialSymbol = getRandomSymbol('!@#$%^&*()');

  const password = [];
  password.push(randomUppercaseLetter, randomDigit, randomSpecialSymbol);

  for (let i = 0; i < 7; i += 1) {
    const randomLowercaseLetter = getRandomSymbol('abcdefghijklmnopqrstuvwxyz');
    password.push(randomLowercaseLetter);
  }
  shuffle(password);
  return password.join('');
};
