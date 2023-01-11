<template>
  <div class="h-full bg-gray-100">
    <main class="mx-auto max-w-7xl pb-10 lg:py-12 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <!-- Payment details -->
        <div class="space-y-6 sm:px-6 lg:col-span-7 lg:px-0">
          <section aria-labelledby="payment-details-heading">
            <form action="#" method="POST">
              <div class="shadow sm:overflow-hidden sm:rounded-md">
                <div class="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2 id="payment-details-heading" class="text-lg font-medium leading-6 text-gray-900">Formkit Json Maker</h2>
                    <p class="mt-1 text-sm text-gray-500">On each form change the json is copied to the clipboard.</p>
                  </div>

                  <div class="mt-6 grid grid-cols-4 gap-6">
                    <div class="col-span-4 sm:col-span-2">
                      <label for="first-name" class="block text-sm font-medium text-gray-700">$formkit</label>
                      <select v-model="formkit.type" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm capitalize">
                        <option value="">-- Choose --</option>
                        <option v-for="type in inputTypes" :key="type" :value="type">{{ type }}</option>
                      </select>
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" v-model="formkit.name" @keyup="setLabel" id="name" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label for="label" class="block text-sm font-medium text-gray-700">Label</label>
                      <input type="text" v-model="formkit.label" id="label" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label for="help" class="block text-sm font-medium text-gray-700">Help Text</label>
                      <input type="text" id="help" v-model="formkit.help" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label for="validatorType" class="block text-sm font-medium text-gray-700">Validators</label>
                      <select id="validatorType" v-model="formkit.validatorType" @change="setValidator"  class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm">
                        <option value="">-- Choose --</option>
                        <option v-for="validator in validators" :key="validator.name" :value="validator.value">{{ validator.name }}</option>
                      </select>
                    </div>

                    <div class="col-span-4 sm:col-span-2">
                      <label for="validator" class="block text-sm font-medium text-gray-700">&nbsp;</label>
                      <input type="text" id="validator" v-model="formkit.validator" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>

                    <div class="col-span-4 sm:col-span-2 relative flex items-start">
                      <div class="flex h-5 items-center">
                        <input id="if" aria-describedby="if-description" v-model="formkit.if" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="if" class="font-medium text-gray-700">If</label>
                        <p id="if-description" class="text-gray-500">If checked, will depend on an other input</p>
                      </div>
                    </div>
                    <div class="col-span-4 sm:col-span-1" v-if="formkit.if">
                      <label for="ifInput" class="block text-sm font-medium text-gray-700">Input ID</label>
                      <input type="text" id="ifInput" v-model="formkit.ifInput" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>
                    <div class="col-span-4 sm:col-span-1" v-if="formkit.if">
                      <label for="ifValue" class="block text-sm font-medium text-gray-700">Value</label>
                      <input type="text" id="ifValue" v-model="formkit.ifValue" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>
                  </div>
                </div>
                <div class="bg-white py-6 px-4 sm:p-6" v-if="showOption">
                  <div>
                    <h2 id="payment-details-heading" class="text-lg font-medium leading-6 text-gray-900">Options</h2>
                  </div>

                  <div class="mt-6 grid grid-cols-4 gap-6" v-for="(option, key) in formkit.options">
                    <div class="col-span-4 sm:col-span-2">
                      <label :for="`option-key-${key}`" class="block text-sm font-medium text-gray-700">key</label>
                      <input type="text" :id="`option-key-${key}`" v-model="option.key" @keyup="setOptionValue(key)" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>
                    <div class="col-span-4 sm:col-span-2">
                      <label :for="`option-value-${key}`" class="block text-sm font-medium text-gray-700">Value</label>
                      <input type="text" :id="`option-value-${key}`" v-model="option.value" class="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
        <div class="space-y-6 sm:px-6 lg:col-span-5 lg:px-0">
          <section aria-labelledby="payment-details-heading">
            <form action="#" method="POST">
              <div class="shadow sm:overflow-hidden sm:rounded-md">
                <div class="bg-white py-6 px-4 sm:p-6">
                  <pre>{{ formkitJson }}</pre>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
const inputTypes = [
  'text',
  'textarea',
  'select',
  'radio',
  'checkbox',
  'hidden',
  'date',
  'email',
  'file',
  'number',
  'telephone',
]

const validators = [
  {value: 'accepted', name: 'accepted'},
  {value: 'alpha', name : 'alpha'},
  {value: 'alphanumeric', name : 'alphanumeric'},
  {value: 'alpha_spaces', name : 'alpha_spaces'},
  {value: 'between:18,25', name : 'between'},
  {value: 'confirm', name : 'confirm'},
  {value: 'date_after:1999-12-31', name : 'date_after'},
  {value: 'date_before:2011-01-01', name : 'date_before'},
  {value: "[['date_between', summerStart, summerEnd]]", name : 'date_between'},
  {value: 'date_format:MM/DD/YYYY', name : 'date_format'},
  {value: 'email', name: 'email'},
  {value: 'ends_with:.edu', name: 'ends_with'},
  {value: 'is:eggs,bacon,sausage,coffee', name: 'is'},
  {value: 'length:5,16', name: 'length'},
  {value: 'matches:node,php,java,python', name: 'matches'},
  {value: 'max:5', name: 'max'},
  {value: 'min:5000', name: 'min'},
  {value: 'not:Hometown', name: 'not'},
  {value: 'number', name: 'number'},
  {value: 'required', name: 'required'},
  {value: 'starts_with:@', name: 'starts_with'},
  {value: 'url', name: 'url'},
]

const formkit = reactive({
  type: '',
  name: '',
  label: '',
  help: '',
  validatorType: '',
  validator: '',
  if: false,
  ifInput: '',
  ifValue: '',
  options: [{key: '', value: ''}],
});

const formkitJson = computed(() => {
  const json = {
    '$formkit': formkit.type,
    'name': formkit.name,
    'label': formkit.label,
    'help': formkit.help,
    'validator': formkit.validator,
  };

  if (formkit.if) {
    json.if = `$get(${formkit.ifInput}).value == '${formkit.ifValue}'`
  }

  if (formkit.type == 'select' || formkit.type == 'radio' || formkit.type == 'checkbox') {
    json.options = formkit.options.filter(option => option.key && option.value);
  }

  copyToClipboard(JSON.stringify(json, null, 2));
  return JSON.stringify(json, null, 2);
});

watch(formkit.options, () => {
  if (formkit.options[formkit.options.length - 1].key !== '' || formkit.options[formkit.options.length - 1].value !== '') {
    formkit.options.push({key: '', value: ''});
  }
});

const showOption = computed(() => {
  return formkit.type == 'select' || formkit.type == 'radio' || formkit.type == 'checkbox';
})

const setLabel = () => {
  formkit.label = capitalize(camelToPhrase(snakeToPhrase(formkit.name)));
}

const setOptionValue = (key) => {
  formkit.options[key].value = capitalize(camelToPhrase(snakeToPhrase(formkit.options[key].key)));
}

const setValidator = () => {
  formkit.validator += ((formkit.validator == '') ? '' : '|') + formkit.validatorType;
}

function snakeToPhrase(snake) {
  return snake.replace(/_/g, " ").replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
}
const capitalize = (str) => {
  const words = str.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (words[i] != '') words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}

const camelToPhrase = (camel) => {
  return camel.replace(/([A-Z])/g, ' $1').trim();
}

const copyToClipboard = async (text) =>  {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
</script>
