<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Avatar, type PopupSettings, popup } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import {userStore, logoutUser} from '$lib/backend';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const popupUser: PopupSettings = {
	// Represents the type of event that opens/closed the popup
	event: 'click',
	// Matches the data-popup value on your popup element
	target: 'popupUser',
	// Defines which side of your trigger the popup will appear
	placement: 'bottom',
};
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href='/'>
					<strong class="text-xl uppercase hover:neon-text-error">Skeleton</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button use:popup={popupUser}>
					<Avatar border="neon-surface hover:neon-error" cursor="cursor-pointer" initials={$userStore? $userStore.username[0] : 'V'} />
				</button>
				<div class="card p-4 w-36 shadow-xl variant-glass-surface flex-col py-1 h-fit" data-popup="popupUser">
					{#if $userStore == null}
					<p class="py-2">Not Logged In</p>
					<a href='/login' class='btn variant-glass-primary hover:neon-primary py-2'>Login</a>
					{:else}
					<p>Welcome {$userStore.username}</p>
					{/if}
					<hr/>
					<button on:click={async () => await logoutUser()}>Logout</button>
					<div class="arrow bg-surface-100-800-token" />
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
