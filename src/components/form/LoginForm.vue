<template>
    <div class="form">
        <div class="logo">
            <img src="@/assets/echo.svg" alt="Echo logo" width="100px" height="100px" />
        </div>
        <div class="header">
            Member login
        </div>
        <div class="element">
            <label for="username">Username: </label>
            <input type="text" id="username" />
        </div>
        <div class="element">
            <label for="password">Password: </label>
            <input type="password" id="password" />
        </div>
        <div class="element">
            <button type="submit">Login</button>
        </div>
        <div class="element register">
            <a @click="$emit('register')" href="#">Register</a>
        </div>
    </div>
</template>