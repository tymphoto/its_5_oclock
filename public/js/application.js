const products = document.getElementById('products');
const addForm = document.getElementById('addForm');
const { comment } = document.forms;
const div = document.getElementById('phoebe');
console.log(div);

products?.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.dataset.delete) {
    const id = e.target.dataset.delete;
    const li = document.getElementById(`li-${id}`);
    // console.log(li)
    const response = await fetch(`/lk/${id}`, {
      method: 'delete',
    });
    if (response.ok) {
      li.remove();
    }
  }
});

addForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  // const newProductName = document.getElementById('productName');
  // const newProductLocation = document.getElementById('productLocation');
  // const newProductDescr = document.getElementById('productDescr');
  // const newProductImage = document.getElementById('productImage');


  const response = await fetch('/new', {
    method: 'post',
    // headers: {
    //   'Content-type': 'application/json',
    // },
    // body: JSON.stringify({
    //   name: `${newProductName.value}`,
    //   location: `${newProductLocation.value}`,
    //   descr: `${newProductDescr.value}`,
    //   image: `${newProductImage.value}`,
    // }),
    body: new FormData(addForm),
  });

  // if (response.ok) {
    // window.location.href = 'http://localhost:3000/lk';
    window.location.href = 'http://localhost:3000';
  // }
});

comment?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (event.target) {
    const input = document.getElementById('text');
    const response = await fetch('/comments', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        text: `${input.value}`,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result.nickname);
      console.log(result.data.text);
      div.insertAdjacentHTML('beforeend', `
        <div class="d-flex flex-column-reverse">
          <div class="p-2 d-flex justify-content-center">
            <div class="comments mb-0 mt-0 bg-light">
              <h6 class="text-success">${result.nickname}</h6>
              <p class="text-muted comment-text">${result.data.text}</p>
            </div>
          </div>
        </div>
      `);
      // window.location.href = `http://localhost:3000/card/${result.id}`;
    }
  }
});
