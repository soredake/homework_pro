class Student {
  fullCourseLength = 25;
  constructor(name, lastName, birthYear, scores) {
    this.name = name;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.scores = scores;
    this.attendance = [];
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  get averageMark() {
    return parseInt(this.scores.reduce((a, n) => a + n) / this.scores.length);
  }

  present() {
    if (this.attendance.length < this.fullCourseLength) {
      this.attendance.push(true);
    }
  }

  absent() {
    if (this.attendance.length < this.fullCourseLength) {
      this.attendance.push(false);
    }
  }

  summary() {
    const visited = this.attendance.filter((x) => x === true).length;
    const calculatedMediumScore = visited / this.attendance.length;
    if (this.averageMark > 90 && calculatedMediumScore > 0.9) {
      return "Молодец!";
    } else if (this.averageMark <= 90 && calculatedMediumScore < 0.9) {
      return "Редиска!";
    } else if (this.averageMark <= 90 || calculatedMediumScore < 0.9) {
      return "Хорошо, но можно и лучше";
    }
  }
}
