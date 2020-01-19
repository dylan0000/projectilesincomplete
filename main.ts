function villain () {
    for (let index = 0; index < 10; index++) {
        enemi = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . 8 8 8 8 . . . . . . 
. . . . . 1 8 8 8 8 1 . . . . . 
. . 1 1 1 1 8 8 8 8 1 1 1 1 . . 
. . 1 1 1 1 8 8 8 8 1 1 1 1 . . 
. . . 1 1 1 8 8 8 8 1 1 1 . . . 
. . . 1 1 1 8 8 8 8 1 1 1 . . . 
. . . . 1 1 8 8 8 8 1 1 . . . . 
. . . . 8 1 8 8 8 8 1 8 . . . . 
. . . . . 8 8 8 8 8 8 . . . . . 
. . . . . . 8 8 8 8 . . . . . . 
. . . . . . . 8 8 . . . . . . . 
. . . . . . . 8 8 . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
        enemi.setPosition(Math.randomRange(20, 150), Math.randomRange(0, 20))
        enemi.setVelocity(0, 50)
    }
}
function Player2 () {
    playerawesome = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . 1 1 . . 1 1 . . . . . 
. . . . . 1 1 . . 1 1 . . . . . 
. . . . . 1 . . . . 1 . . . . . 
. . . . . 1 . . . . 1 . . . . . 
. . . . 1 1 . . . . 1 1 . . . . 
. . . . 1 1 1 . . 1 1 1 . . . . 
. . . . 1 1 1 . . 1 1 1 . . . . 
. . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . 1 1 1 1 1 1 1 1 1 1 . . . 
. . . . 1 1 1 1 1 1 1 1 . . . . 
. . . . . 1 1 1 1 1 1 . . . . . 
`, SpriteKind.Player)
    playerawesome.setPosition(78, 160)
    controller.moveSprite(playerawesome, 100, 0)
    controller.configureRepeatEventDefaults(0, 150)
    scene.cameraFollowSprite(playerawesome)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (shotcount <= 3) {
        projectile2()
        shotcount += 1
    } else {
        playerawesome.say("!", 200)
        info.startCountdown(3)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
function projectile2 () {
    projectile = sprites.createProjectileFromSprite(img`
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
. . . . . . . 2 2 . . . . . . . 
`, playerawesome, 0, -100)
}
info.onCountdownEnd(function () {
    if (shotcount >= 3) {
        shotcount = 0
    }
})
let projectile: Sprite = null
let shotcount = 0
let playerawesome: Sprite = null
let enemi: Sprite = null
Player2()
villain()
game.onUpdateInterval(5000, function () {
    villain()
})
