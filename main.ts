namespace SpriteKind {
    export const Lava = SpriteKind.create()
    export const Mushroom = SpriteKind.create()
    export const Teleporter1 = SpriteKind.create()
    export const Teleporter2 = SpriteKind.create()
    export const Secret_Collect_EggPet = SpriteKind.create()
    export const Follower = SpriteKind.create()
    export const Exit = SpriteKind.create()
    export const Teleporter3 = SpriteKind.create()
    export const Teleporter4 = SpriteKind.create()
    export const Secret_Collect_DoubleJump = SpriteKind.create()
    export const Secret_Collect_EggPet2 = SpriteKind.create()
    export const Vines = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Secret_Collect_DoubleJump, function (sprite, otherSprite) {
    sprites.destroy(Secret_Collect2, effects.starField, 500)
    info.changeLifeBy(1)
    info.changeScoreBy(20)
    DoubleJump_Ability = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Secret_Collect_EggPet2, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    info.changeScoreBy(20)
    sprites.destroy(Secret_Collect3, effects.hearts, 500)
    Pet_Spawn2 = true
    Pet_Secret2 = sprites.create(assets.image`Duck_Pet_Secret`, SpriteKind.Follower)
    Pet_Secret2.setFlag(SpriteFlag.StayInScreen, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Teleporter1, function (sprite, otherSprite) {
    pause(500)
    Mushroom_Escapist.setPosition(120, 584)
    tiles.placeOnRandomTile(Mushroom_Escapist, assets.tile`Teleporter_2`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Teleporter2, function (sprite, otherSprite) {
    pause(500)
    Mushroom_Escapist.setPosition(40, 600)
    tiles.placeOnRandomTile(Mushroom_Escapist, assets.tile`Teleporter_1`)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.left.isPressed()) {
        animation.runImageAnimation(
        Mushroom_Escapist,
        assets.animation`Mushroom_LeftAnim`,
        100,
        false
        )
        music.play(music.createSoundEffect(
        WaveShape.Square,
        400,
        600,
        255,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
    } else if (controller.right.isPressed()) {
        animation.runImageAnimation(
        Mushroom_Escapist,
        assets.animation`Mushroom_RightAnim`,
        100,
        false
        )
        music.play(music.createSoundEffect(
        WaveShape.Square,
        400,
        600,
        255,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
    }
    if (Mushroom_Escapist.vy == 0) {
        music.play(music.createSoundEffect(
        WaveShape.Square,
        400,
        600,
        255,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
        Mushroom_Escapist.vy = -175
        JUMP = true
    } else if (DoubleJump_Ability == true && JUMP == true) {
        Mushroom_Escapist.startEffect(effects.trail, 1000)
        music.play(music.createSoundEffect(
        WaveShape.Square,
        400,
        600,
        255,
        0,
        100,
        SoundExpressionEffect.None,
        InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
        scene.cameraShake(2, 500)
        Mushroom_Escapist.vy = -175
        JUMP = false
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    info.changeLifeBy(-1)
    Mushroom_Escapist.sayText("AHHHHHHH", 500, false)
})
sprites.onOverlap(SpriteKind.Teleporter1, SpriteKind.Lava, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 2000)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Mushroom_Escapist,
    assets.animation`Mushroom_LeftAnim`,
    100,
    true
    )
    if (Pet_Spawn == true) {
        animation.runImageAnimation(
        Pet_Secret,
        assets.animation`Monkey_LeftAnim`,
        200,
        true
        )
    }
    if (Pet_Spawn2 == true) {
        animation.runImageAnimation(
        Pet_Secret2,
        assets.animation`Duck_LeftAnim`,
        200,
        true
        )
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Lava, function (sprite, otherSprite) {
    if (Is_Hurt_Period == false) {
        info.changeLifeBy(-1)
        Is_Hurt_Period = true
        Mushroom_Escapist.sayText("Ouch!", 1000, true)
        Mushroom_Escapist.vy = -150
        Is_Hurt_Period = false
    }
})
function SetGameEntities () {
    scene.cameraFollowSprite(Mushroom_Escapist)
    Is_Hurt_Period = false
    for (let value of tiles.getTilesByType(sprites.dungeon.hazardLava0)) {
        Lava_Row = sprites.create(assets.image`Lava_Wall`, SpriteKind.Lava)
        tiles.placeOnTile(Lava_Row, value)
        tiles.setTileAt(value, assets.tile`baseTransparency16`)
    }
    for (let value2 of tiles.getTilesByType(assets.tile`stairLarge`)) {
        tiles.placeOnTile(Mushroom_Escapist, value2)
    }
    for (let value3 of tiles.getTilesByType(assets.tile`Mushroom_Bouncer`)) {
        Bouncer_Mushroom = sprites.create(assets.image`Mushroom_MainBouncer`, SpriteKind.Mushroom)
        tiles.placeOnTile(Bouncer_Mushroom, value3)
        tiles.setTileAt(value3, assets.tile`baseTransparency16`)
    }
    for (let value4 of tiles.getTilesByType(assets.tile`Teleporter_1`)) {
        Teleporter_1 = sprites.create(assets.image`Teleporter_1Bef`, SpriteKind.Teleporter1)
        tiles.placeOnTile(Teleporter_1, value4)
        tiles.setTileAt(value4, assets.tile`baseTransparency16`)
    }
    for (let value5 of tiles.getTilesByType(assets.tile`Teleporter_2`)) {
        Teleporter_2 = sprites.create(assets.image`Teleporter_2Aft`, SpriteKind.Teleporter2)
        tiles.placeOnTile(Teleporter_2, value5)
        tiles.setTileAt(value5, assets.tile`baseTransparency16`)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`Secret_Collect1`)) {
        Secret_Collect = sprites.create(assets.image`Egg_Secret`, SpriteKind.Secret_Collect_EggPet)
        tiles.placeOnTile(Secret_Collect, value6)
        tiles.setTileAt(value6, assets.tile`baseTransparency16`)
        animation.runImageAnimation(
        Secret_Collect,
        assets.animation`Egg_Rolling_Anim`,
        200,
        true
        )
    }
    for (let value8 of tiles.getTilesByType(assets.tile`Teleporter_3`)) {
        Teleporter_3 = sprites.create(assets.image`Teleporter3_Bef`, SpriteKind.Teleporter3)
        tiles.placeOnTile(Teleporter_3, value8)
        tiles.setTileAt(value8, assets.tile`baseTransparency16`)
    }
    for (let value9 of tiles.getTilesByType(assets.tile`Teleporter_4`)) {
        Teleporter_4 = sprites.create(assets.image`Teleporter_4Aft`, SpriteKind.Teleporter4)
        tiles.placeOnTile(Teleporter_4, value9)
        tiles.setTileAt(value9, assets.tile`baseTransparency16`)
    }
    for (let value10 of tiles.getTilesByType(assets.tile`SecretCollect_2`)) {
        Secret_Collect2 = sprites.create(assets.image`SecretCollect_2`, SpriteKind.Secret_Collect_DoubleJump)
        tiles.placeOnTile(Secret_Collect2, value10)
        tiles.setTileAt(value10, assets.tile`baseTransparency16`)
    }
    for (let value11 of tiles.getTilesByType(assets.tile`DoubleJump_PowerUp_Collect`)) {
        Secret_Collect3 = sprites.create(assets.image`Egg_Secret2`, SpriteKind.Secret_Collect_EggPet2)
        tiles.placeOnTile(Secret_Collect3, value11)
        tiles.setTileAt(value11, assets.tile`baseTransparency16`)
        animation.runImageAnimation(
        Secret_Collect3,
        assets.animation`Egg_Rolling_Anim2`,
        200,
        true
        )
    }
    Pet_Spawn = false
    Pet_Spawn2 = false
    DoubleJump_Ability = false
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Teleporter3, function (sprite, otherSprite) {
    pause(500)
    Mushroom_Escapist.setPosition(40, 424)
    tiles.placeOnRandomTile(Mushroom_Escapist, assets.tile`Teleporter_4`)
})
sprites.onOverlap(SpriteKind.Teleporter2, SpriteKind.Lava, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 2000)
})
function Destroy_All () {
    for (let Bouncer_Mushroom of sprites.allOfKind(SpriteKind.Mushroom)) {
        sprites.destroy(Bouncer_Mushroom)
    }
    for (let Lava_Row of sprites.allOfKind(SpriteKind.Lava)) {
        sprites.destroy(Lava_Row)
    }
    for (let Secret_Collect of sprites.allOfKind(SpriteKind.Secret_Collect_EggPet)) {
        sprites.destroy(Secret_Collect)
    }
    for (let Pet_Secret of sprites.allOfKind(SpriteKind.Follower)) {
        sprites.destroy(Pet_Secret)
    }
    for (let Teleporter_1 of sprites.allOfKind(SpriteKind.Teleporter1)) {
        sprites.destroy(Teleporter_1)
    }
    for (let Teleporter_2 of sprites.allOfKind(SpriteKind.Teleporter2)) {
        sprites.destroy(Teleporter_2)
    }
    for (let Exit_Up of sprites.allOfKind(SpriteKind.Exit)) {
        sprites.destroy(Exit_Up)
    }
    for (let value7 of tiles.getTilesByType(sprites.dungeon.hazardLava0)) {
        tiles.setTileAt(value7, assets.tile`baseTransparency16`)
    }
    for (let index of tiles.getTilesByType(sprites.dungeon.hazardLava0)) {
        tiles.setTileAt(index, assets.tile`baseTransparency16`)
    }
}
sprites.onOverlap(SpriteKind.Mushroom, SpriteKind.Lava, function (sprite, otherSprite) {
    sprites.destroy(sprite, effects.fire, 2000)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Mushroom_Escapist,
    assets.animation`Mushroom_RightAnim`,
    100,
    true
    )
    if (Pet_Spawn == true) {
        animation.runImageAnimation(
        Pet_Secret,
        assets.animation`Monkey_RightAnim`,
        200,
        true
        )
    }
    if (Pet_Spawn2 == true) {
        animation.runImageAnimation(
        Pet_Secret2,
        assets.animation`Duck_RightAnim`,
        200,
        true
        )
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Poison`, function (sprite, location) {
    info.changeLifeBy(-1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Exit_Up`, function (sprite, location) {
    game.setGameOverPlayable(true, music.melodyPlayable(music.powerUp), false)
    game.setGameOverMessage(true, "YOU ESCAPED!")
    game.setGameOverEffect(true, effects.confetti)
    game.gameOver(true)
})
info.onLifeZero(function () {
    game.gameOver(false)
    Lava_Row.setFlag(SpriteFlag.AutoDestroy, true)
    Mushroom_Escapist.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Secret_Collect_EggPet, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    info.changeScoreBy(20)
    sprites.destroy(Secret_Collect, effects.hearts, 500)
    Pet_Spawn = true
    Pet_Secret = sprites.create(assets.image`Monkey_Pet_Secret`, SpriteKind.Follower)
    Pet_Secret.setFlag(SpriteFlag.StayInScreen, true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Teleporter4, function (sprite, otherSprite) {
    pause(500)
    Mushroom_Escapist.setPosition(136, 280)
    tiles.placeOnRandomTile(Mushroom_Escapist, assets.tile`Teleporter_3`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Mushroom, function (sprite, otherSprite) {
    Mushroom_Escapist.vy = -250
})
let Teleporter_4: Sprite = null
let Teleporter_3: Sprite = null
let Secret_Collect: Sprite = null
let Teleporter_2: Sprite = null
let Teleporter_1: Sprite = null
let Bouncer_Mushroom: Sprite = null
let Lava_Row: Sprite = null
let Is_Hurt_Period = false
let Pet_Secret: Sprite = null
let Pet_Spawn = false
let JUMP = false
let Pet_Secret2: Sprite = null
let Pet_Spawn2 = false
let Secret_Collect3: Sprite = null
let DoubleJump_Ability = false
let Secret_Collect2: Sprite = null
let History_YMush: number[] = []
let History_XMush: number[] = []
let Mushroom_Escapist: Sprite = null
game.setDialogCursor(assets.image`MonkeyCursor`)
game.setDialogTextColor(15)
game.showLongText("Welcome to Parallel Panic, a game where you climb up the tower as fast as you can and save your friends!", DialogLayout.Bottom)
game.showLongText("Get special orbs for power-ups...", DialogLayout.Bottom)
game.showLongText("Use Teleporters to move up...", DialogLayout.Bottom)
game.showLongText("And use Mushrooms to clear heights!", DialogLayout.Bottom)
game.showLongText("Good Luck!", DialogLayout.Bottom)
Mushroom_Escapist = sprites.create(assets.image`Mushroom_Wink`, SpriteKind.Player)
History_XMush.insertAt(0, Mushroom_Escapist.x)
History_YMush.insertAt(0, Mushroom_Escapist.y)
History_XMush = []
History_YMush = []
tiles.setCurrentTilemap(tilemap`Parallel Panic - Level 1`)
scene.setBackgroundColor(13)
let MapValue = 0
Mushroom_Escapist.ay = 300
controller.moveSprite(Mushroom_Escapist, 100, 0)
scene.cameraFollowSprite(Mushroom_Escapist)
info.setLife(10)
info.setScore(0)
music.setVolume(50)
music.play(music.createSong(assets.song`Parallel Panic - Theme Song`), music.PlaybackMode.LoopingInBackground)
SetGameEntities()
game.onUpdate(function () {
    if (Pet_Spawn == true) {
        History_XMush.insertAt(0, Mushroom_Escapist.x)
        History_YMush.insertAt(0, Mushroom_Escapist.y)
        if (History_XMush.length > 10) {
            Pet_Secret.x = History_XMush[10]
            Pet_Secret.y = History_YMush[10]
            History_XMush.removeAt(11)
            History_YMush.removeAt(11)
        }
    }
    if (Pet_Spawn2 == true) {
        History_XMush.insertAt(0, Mushroom_Escapist.x)
        History_YMush.insertAt(0, Mushroom_Escapist.y)
        if (History_XMush.length > 20) {
            Pet_Secret2.x = History_XMush[20]
            Pet_Secret2.y = History_YMush[20]
            History_XMush.removeAt(21)
            History_YMush.removeAt(21)
        }
    }
})
game.onUpdateInterval(200, function () {
    for (let Lava_Row of sprites.allOfKind(SpriteKind.Lava)) {
        Lava_Row.vy = -14
    }
    for (let index = 0; index <= 10; index++) {
        tiles.setTileAt(tiles.getTileLocation(index, Lava_Row.y / 16 + 1), sprites.dungeon.hazardLava0)
    }
})
