postiion:fixed or fixed when u scroll component won't move
inset-0 means top-0 left-0 right-0 bottom-0 with positon fixed is is necessary

backdrop-filter: blur(4px); // for `backdrop-blur-sm`

backdrop-blur-sm gives a blurred effect to what's behind.
bg-black/50 gives a see-through dark layer that enhances the blur and dims the content underneath.
On its own, backdrop-blur-sm would be invisible unless the background is partly transparent — that’s why bg-black/50 is needed.

On inline elements you can't set the width/height, it simply takes up the space needed based on the content of itself.

With inline-block, you can set width/height. inline-block is often used with float to wrap elements next to each other (however flexbox and grid are much better for that sort of thing).

Tool tip for the element
1.make it relative and group
2.tooltip absoult top-full left-1/2 translate-x-[-50%]

<div className="relative group">
        <div className="h-8 w-8 bg-amber-950 text-white rounded-full text-lg flex items-center justify-center cursor-pointer">
            <p>S</p>
        </div>
    <div className="absolute top-full left-1/2 translate-x-[-50%] mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
            Your Profile
            </div>
          </div>