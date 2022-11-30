/*
# Test JS - Backend Developer #

Task :
1. Isikan proses di dalam fungsi _mergeSortArray() untuk menyatukan array int a dan array int b. Lalu setelah itu di sort secara ascending.
2. Isikan proses di dalam fungsi _getMissingData() untuk mencari integer yang hilang berdasarkan pola angka dari hasil fungsi _mergeSortArray().
3. Isikan proses di dalam fungsi _insertMissingData() untuk memasukkan integer yang hilang dari hasil fungsi _getMissingData() ke dalam array hasil fungsi _mergeSortArray().
4. Hasil yang diharapkan adalah pola angka yang tersusun tanpa ada integer yang hilang.
5. Nilai plus jika dapat mengimplementasikan mengenai Promise / async - await

Syarat :
1. Tidak menggunakan fungsi bawaan JS seperti 
	a. Array.concat()
	b. Array.join()
	c. Array.sort()
	d. dsb.
2. Kerjakan menggunakan logic pemograman anda sendiri

Selamat Mengerjakan
*/

class Test {
  _mergeSortArray(a, b) {
    for (let i = 0; i < b.length; i++) {
      a.push(b[i]);
    }
    for (let j = 0; j < a.length -1; j++) {
        if (a[j] > a[j + 1]) {
            let temp = a[j]
            a[j] = a[j + 1]
            a[j + 1] = temp
            j = -1
        }
    }
    return a;
  }

  _getMissingData(c) {
    let missingNum = []
    for (let i = c[0]; i < c[c.length-1]; i++) {
        if (c.indexOf(i) === -1) {
            missingNum.push(i)
        }
    }
    return missingNum;
  }


 _insertMissingData(c, i) {
   let result = this._mergeSortArray(c, i)
    return result;
  }

 main() {
    console.log("START");

    const a = [11, 36, 65, 135, 98];
    const b = new Array();
    b.push(81);
    b.push(23);
    b.push(50);
    b.push(155);

    const c = this._mergeSortArray(a, b);
    const i = this._getMissingData(c);
    const final_result = this._insertMissingData(c, i);

    console.dir("RESULT : ", final_result);
  }
}

const test_run = new Test();
test_run.main();
