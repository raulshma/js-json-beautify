import '@alenaksu/json-viewer';

const viewer = document.querySelector('json-viewer');
const expand = document.querySelector('#expand');
const collapse = document.querySelector('#collapse');
const filter = document.querySelector('#filter');
const search = document.querySelector('#search');
const copyBtn = document.querySelector('#copyBtn');
const jsonTextEle = document.querySelector('#jsonText');

let currentSearch;

document.addEventListener('DOMContentLoaded', function () {
  jsonTextEle.addEventListener('input', handleTextInput);
  copyBtn.addEventListener('click', handleCopyButton);
  expand.addEventListener('click', (e) => {
    e.preventDefault();
    viewer.expandAll();
  });

  collapse.addEventListener('click', (e) => {
    e.preventDefault();
    viewer.collapseAll();
  });

  filter.addEventListener('change', () => {
    if (!filter.value) viewer.resetFilter();
    else viewer.filter(filter.value);
  });

  search.addEventListener('input', () => {
    currentSearch = viewer.search(search.value);
  });
  search.addEventListener('keyup', (e) => {
    if (currentSearch && e.keyCode === 13) {
      currentSearch.next();
    }
  });
});

function handleTextInput(e) {
  let textValue = e.target.value;
  if (textValue.length <= 0) return;
  if (textValue.startsWith('"'))
    textValue = textValue.slice(1, textValue.length);
  if (textValue.endsWith('"'))
    textValue = textValue.slice(0, textValue.length - 1);
  textValue = textValue.replaceAll('\\n', '');
  textValue = textValue.replaceAll('\\r', '');
  // const jsonBeautified = JSON.stringify(JSON.parse(textValue), undefined, 4);
  // const beautifiedPre = document.querySelector('pre');
  // beautifiedPre.textContent = jsonBeautified;
  try {
    const parsedJSONObject = JSON.parse(textValue);
    viewer.data = parsedJSONObject;
    viewer.expandAll();
  } catch (_) {
    console.warn('Failed to parse json');
  }
}

function handleCopyButton() {
  if (viewer.data == null) return;
  try {
    const jsonString = JSON.stringify(viewer.data, undefined, 4);
    navigator.clipboard.writeText(jsonString).then(
      function () {
        copyBtn.classList.remove('btn-info');
        copyBtn.classList.add('btn-success');
        copyBtn.innerText = 'Copied';
        console.log('Copying to clipboard was successful!');
        setTimeout(() => {
          copyBtn.classList.add('btn-info');
          copyBtn.classList.remove('btn-success');
          copyBtn.innerText = 'Copy Json';
        }, 2500);
      },
      function (err) {
        console.error('Could not copy text: ', err);
      }
    );
  } catch (e) {
    copyBtn.classList.remove('btn-info');
    copyBtn.classList.add('btn-danger');
    copyBtn.innerText = 'Failed';
    console.error('Could not copy text: ', e);
    setTimeout(() => {
      copyBtn.classList.add('btn-info');
      copyBtn.classList.remove('btn-danger');
      copyBtn.innerText = 'Copy Json';
    }, 2500);
  }
}
