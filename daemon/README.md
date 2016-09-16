## homeUniverse control daemon

this is a daemon that listens for incoming socket connections and can perform
operations over certain devices connected to the grid


it is componed by three base elements

command listener / router
device drivers 
device register


so if a command comes in, the router should perform the required checks and
execute it accordingly

##this daemon service provides endpoints for

 - registering a new device
 - deregister a device
 - attaching a new device to the universe
 - deattaching a new device to the universe
 - listing all devices filterd by criteria (attached, deattached, registered)
 - updating the device register
 - performing operations over a device exposed controls 
 - requesting device operations info


