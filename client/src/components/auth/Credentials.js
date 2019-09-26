import React from 'react';



export default ({ submit, action, allowName = false, loading, error }) => (
  <div class="is-warning ">
    <div class="column is-waring is-4 is-offset-4">
      <div class="box animated fadeIn is-warning" >
        <form onSubmit={e => {
          e.preventDefault();
          const { elements } = e.target;
          const data = action === 'Sign Up' ?
          {
            email: elements.email.value,
            password: elements.password.value,
            firstName: elements.firstName.value,
            lastName: elements.lastName.value,
            roles: ['client']
          } : {
            email: elements.email.value,
            password: elements.password.value
          };
          submit(data);
        }}>
          <h4 class="title has-text-grey">{ allowName ? 'Create an Account' : 'Login' }</h4>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
          { allowName &&
            <div class="field">
              <div class="control">
                <input class="input is-medium" placeholder="First Name" name="firstName"/>
              </div>
            </div>}
            { allowName &&
            <div class="field">
              <div class="control">
                <input class="input is-medium" placeholder="Last Name" name="lastName"/>
              </div>
            </div>}
            <div class="field">
              <div class="control">
              <input class="input is-medium" placeholder="Email" name="email"/>
              </div>
            </div>
            <div class="field">
              <div class="control">
              <input class="input is-medium" placeholder="Password" name="password"/>
              </div>
            </div>
            <div class="field has-text-centered">
              <div class="control has-text-centered">
              { error ? <div class="animated shake button is-danger is-small ">Authentication Failed</div> : null}
              </div>
            </div>
          <button class={loading ? "button is-loading is-large is-info" : "button is-outlined is-large is-info"}>{action}</button>

        </form>
      </div>
    </div>
  </div>
);
