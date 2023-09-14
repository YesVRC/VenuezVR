<script lang='ts'>
	import { VenuezApi, tokenStore } from "$lib/backend";

const api = new VenuezApi('http://localhost:3000/api');
let username: string, email: string, password: string;

async function submit(){
    await api.register(username, email, password);
    console.log($tokenStore);
    await api.getCurrentUser();
}
</script>

<form on:submit={async () => await submit()}>
<input type='text' placeholder='Username' bind:value={username}/>
<input type='text' placeholder='Email' bind:value={email}/>
<input type='password' placeholder='Password' bind:value={password}/>
<button type="submit">Submit</button>
</form>