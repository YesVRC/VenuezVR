<script lang='ts'>
	import { VenuezApi, tokenStore } from "$lib/backend";

const api = new VenuezApi('http://localhost:3000/api');
let usernameOrEmail: string, password: string;

async function submit(){
    await api.login(usernameOrEmail, password);
    await api.getCurrentUser();
}
</script>

<form on:submit={async () => await submit()} class='text-error-700'>
<input type='text' placeholder='Username Or Email' bind:value={usernameOrEmail}/>
<input type='password' placeholder='Password' bind:value={password}/>
<button type="submit">Submit</button>
</form>