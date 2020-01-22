

function initializeCoreMod() {
    return {
        'droploot': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraft.world.spawner.AbstractSpawner',
                'methodName': 'func_98279_f', // isActivated
                'methodDesc': '()Z'
            },
            'transformer': function(method) {
              print('[CursedEarth]: Patching Minecraft\' AbstractSpawner#isActivated');

                var ASM = Java.type('net.minecraftforge.coremod.api.ASMAPI');
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                var InsnList = Java.type('org.objectweb.asm.tree.InsnList');
                var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');

                var instructions = method.instructions;
                var lastInstruction = instructions.get(0);

                var newInstructions = new InsnList();
                newInstructions.add(new VarInsnNode(Opcodes.ALOAD, 0));

                newInstructions.add(ASM.buildMethodCall(
                    "com/tfar/cursedearth/CursedEarth",
                    "hook",
                    "(Lnet/minecraft/world/spawner/AbstractSpawner;)Z",
                    ASM.MethodType.STATIC
                ));
                newInstructions.add(new InsnNode(Opcodes.IRETURN));

                method.instructions.insertBefore(lastInstruction, newInstructions);

                return method;
            }
        }
     }
  }