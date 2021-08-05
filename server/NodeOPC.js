exports.Nodereads = [
  // ---------SYS State----////
  'ns=3;s="System_Status"',
  'ns=3;s="System_Auto"',
  'ns=3;s="System_Man"',
  'ns=3;s="System_Service"',
  'ns=3;s="Sys_Error"',
  'ns=3;s="UV_CMD"',
  /* Pump 1*/
  'ns=3;s="Pump_1"."MODE"',
  'ns=3;s="Pump_1"."FEEDBACK"',

  'ns=3;s="Pump_1"."Speed"',
  /* Pump 2*/
  'ns=3;s="Pump_2"."MODE"',
  'ns=3;s="Pump_2"."FEEDBACK"',

  'ns=3;s="Pump_2"."Speed"',
  /* Pump_3*/
  'ns=3;s="Pump_3"."MODE"',
  'ns=3;s="Pump_3"."FEEDBACK"',

  'ns=3;s="Pump_3"."Speed"',
  /* Pump_4*/
  'ns=3;s="Pump_4"."MODE"',
  'ns=3;s="Pump_4"."FEEDBACK"',

  'ns=3;s="Pump_4"."Speed"',
  /* Pump_5*/
  'ns=3;s="Pump_5"."MODE"',
  'ns=3;s="Pump_5"."FEEDBACK"',
 
  'ns=3;s="Pump_5"."Speed"',
  /* Pump_6*/
  'ns=3;s="Pump_6"."MODE"',
  'ns=3;s="Pump_6"."FEEDBACK"',
  
  'ns=3;s="Pump_6"."Speed"',
  /* VF */
  'ns=3;s="VF"."MODE"',
  'ns=3;s="VF"."OPENED"',
  'ns=3;s="VF"."CLOSED"',
  
  /* VA1 */
  'ns=3;s="VA1"."MODE"',
  'ns=3;s="VA1"."OPENED"',
  'ns=3;s="VA1"."CLOSED"',
  
  /* VA2 */
  'ns=3;s="VA2"."MODE"',
  'ns=3;s="VA2"."OPENED"',
  'ns=3;s="VA2"."CLOSED"',

  /* VA3 */
  'ns=3;s="VA3"."MODE"',
  'ns=3;s="VA3"."OPENED"',
  'ns=3;s="VA3"."CLOSED"',
  
  /* VA4 */
  'ns=3;s="VA4"."MODE"',
  'ns=3;s="VA4"."OPENED"',
  'ns=3;s="VA4"."CLOSED"',

  /* VA5 */
  'ns=3;s="VA5"."MODE"',
  'ns=3;s="VA5"."OPENED"',
  'ns=3;s="VA5"."CLOSED"',
 
  /* VB1 */
  'ns=3;s="VB1"."MODE"',
  'ns=3;s="VB1"."OPENED"',
  'ns=3;s="VB1"."CLOSED"',
  
  /* VB2 */
  'ns=3;s="VB2"."MODE"',
  'ns=3;s="VB2"."OPENED"',
  'ns=3;s="VB2"."CLOSED"',

  /* VB3 */
  'ns=3;s="VB3"."MODE"',
  'ns=3;s="VB3"."OPENED"',
  'ns=3;s="VB3"."CLOSED"',

  /* VB4 */
  'ns=3;s="VB4"."MODE"',
  'ns=3;s="VB4"."OPENED"',
  'ns=3;s="VB4"."CLOSED"',
 
  /* VB5 */
  'ns=3;s="VB5"."MODE"',
  'ns=3;s="VB5"."OPENED"',
  'ns=3;s="VB5"."CLOSED"',
  
  /* VC1 */
  'ns=3;s="VC1"."MODE"',
  'ns=3;s="VC1"."OPENED"',
  'ns=3;s="VC1"."CLOSED"',
  
  /* VC2 */
  'ns=3;s="VC2"."MODE"',
  'ns=3;s="VC2"."OPENED"',
  'ns=3;s="VC2"."CLOSED"',
 
  /* VC3 */
  'ns=3;s="VC3"."MODE"',
  'ns=3;s="VC3"."OPENED"',
  'ns=3;s="VC3"."CLOSED"',


  /* Level Tank */
  'ns=3;s="MTank_Level"',
  'ns=3;s="FTank_Level"',
  'ns=3;s="CTank_Level"',

  /* Pressure Value */
  'ns=3;s="PS1_M"',
  'ns=3;s="PS2_M"',
  'ns=3;s="PS3_M"',
  // *
  'ns=3;s="FLow_FA_IN"',
  'ns=3;s="FLow_FB_IN"',
  'ns=3;s="FLow_RO_IN"',
    // --------Time Run-----///
    'ns=3;s="Timer_Backwash"',
    'ns=3;s="Timer_Rinse"',
    'ns=3;s="Timer_Pump23"',
    'ns=3;s="Timer_Pump45"',
  /* -------Set Parameters-----*/
  'ns=3;s="DataSystem"."TimeInvertPump23"',
  'ns=3;s="DataSystem"."TimeInvertPump45"',
  'ns=3;s="DataSystem"."Time_Rinse"',
  'ns=3;s="DataSystem"."Time_Backwash"',
  // --------Set Pressure-----///
  'ns=3;s="DataSystem"."PS_Filter1_Set"',
  'ns=3;s="DataSystem"."PS_Filter2_Set"',
  'ns=3;s="DataSystem"."PS_RO_Set"',
  // Running time//
  'ns=3;s="Pump_1"."RUNNINGTIME"',
  'ns=3;s="Pump_2"."RUNNINGTIME"',
  'ns=3;s="Pump_3"."RUNNINGTIME"',
  'ns=3;s="Pump_4"."RUNNINGTIME"',
  'ns=3;s="Pump_5"."RUNNINGTIME"',
  'ns=3;s="Pump_6"."RUNNINGTIME"',
  // ----Fault----//
  'ns=3;s="Pump_1"."FAULT"',
  'ns=3;s="Pump_2"."FAULT"',
  'ns=3;s="Pump_3"."FAULT"',
  'ns=3;s="Pump_4"."FAULT"',
  'ns=3;s="Pump_5"."FAULT"',
  'ns=3;s="Pump_6"."FAULT"',
  'ns=3;s="VF"."FAULT"',
  'ns=3;s="VA1"."FAULT"',
  'ns=3;s="VA2"."FAULT"',
  'ns=3;s="VA3"."FAULT"',
  'ns=3;s="VA4"."FAULT"',
  'ns=3;s="VA5"."FAULT"',
  'ns=3;s="VB1"."FAULT"',
  'ns=3;s="VB2"."FAULT"',
  'ns=3;s="VB3"."FAULT"',
  'ns=3;s="VB4"."FAULT"',
  'ns=3;s="VB5"."FAULT"',
  'ns=3;s="VC1"."FAULT"',
  'ns=3;s="VC2"."FAULT"',
  'ns=3;s="VC3"."FAULT"',

];
exports.Nodereadsfaults = [
  'ns=3;s="Pump_1"."FAULT"',
  'ns=3;s="Pump_2"."FAULT"',
  'ns=3;s="Pump_3"."FAULT"',
  'ns=3;s="Pump_4"."FAULT"',
  'ns=3;s="Pump_5"."FAULT"',
  'ns=3;s="Pump_6"."FAULT"',
  'ns=3;s="VF"."FAULT"',
  'ns=3;s="VA1"."FAULT"',
  'ns=3;s="VA2"."FAULT"',
  'ns=3;s="VA3"."FAULT"',
  'ns=3;s="VA4"."FAULT"',
  'ns=3;s="VA5"."FAULT"',
  'ns=3;s="VB1"."FAULT"',
  'ns=3;s="VB2"."FAULT"',
  'ns=3;s="VB3"."FAULT"',
  'ns=3;s="VB4"."FAULT"',
  'ns=3;s="VB5"."FAULT"',
  'ns=3;s="VC1"."FAULT"',
  'ns=3;s="VC2"."FAULT"',
  'ns=3;s="VC3"."FAULT"',
];