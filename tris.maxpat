{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 6,
			"revision" : 5,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 134.0, 55.0, 640.0, 610.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 145.138895809650421, 104.861116111278534, 98.0, 22.0 ],
					"text" : "sprintf mute %i 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 114.138895809650421, 160.416674315929413, 50.0, 35.0 ],
					"presentation_linecount" : 2,
					"text" : "mute 56 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 145.138895809650421, 72.222225666046143, 75.0, 22.0 ],
					"text" : "route /delete"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 295.83334743976593, 97.916671335697174, 98.0, 22.0 ],
					"text" : "sprintf mute %i 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 299.30556982755661, 175.694452822208405, 50.0, 35.0 ],
					"text" : "mute 0 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 295.83334743976593, 65.277780890464783, 65.0, 22.0 ],
					"text" : "route /new"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-52",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 47.0, 35.0, 97.0, 22.0 ],
					"text" : "udpreceive 3001"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 47.0, 236.805566847324371, 90.0, 22.0 ],
					"text" : "poly~ polytri 20"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 1 ],
					"order" : 0,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"order" : 1,
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 1 ],
					"order" : 0,
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"order" : 1,
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-4", 0 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"order" : 1,
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"order" : 0,
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-4.10::obj-12" : [ "vst~[16]", "vst~[3]", 0 ],
			"obj-4.10::obj-3" : [ "vst~[15]", "vst~", 0 ],
			"obj-4.11::obj-12" : [ "vst~[18]", "vst~[3]", 0 ],
			"obj-4.11::obj-3" : [ "vst~[17]", "vst~", 0 ],
			"obj-4.12::obj-12" : [ "vst~[20]", "vst~[3]", 0 ],
			"obj-4.12::obj-3" : [ "vst~[19]", "vst~", 0 ],
			"obj-4.13::obj-12" : [ "vst~[22]", "vst~[3]", 0 ],
			"obj-4.13::obj-3" : [ "vst~[21]", "vst~", 0 ],
			"obj-4.14::obj-12" : [ "vst~[23]", "vst~[3]", 0 ],
			"obj-4.14::obj-3" : [ "vst~[24]", "vst~", 0 ],
			"obj-4.15::obj-12" : [ "vst~[26]", "vst~[3]", 0 ],
			"obj-4.15::obj-3" : [ "vst~[25]", "vst~", 0 ],
			"obj-4.16::obj-12" : [ "vst~[27]", "vst~[3]", 0 ],
			"obj-4.16::obj-3" : [ "vst~[28]", "vst~", 0 ],
			"obj-4.17::obj-12" : [ "vst~[29]", "vst~[3]", 0 ],
			"obj-4.17::obj-3" : [ "vst~[30]", "vst~", 0 ],
			"obj-4.18::obj-12" : [ "vst~[32]", "vst~[3]", 0 ],
			"obj-4.18::obj-3" : [ "vst~[31]", "vst~", 0 ],
			"obj-4.19::obj-12" : [ "vst~[33]", "vst~[3]", 0 ],
			"obj-4.19::obj-3" : [ "vst~[34]", "vst~", 0 ],
			"obj-4.1::obj-12" : [ "vst~[38]", "vst~[3]", 0 ],
			"obj-4.1::obj-3" : [ "vst~[37]", "vst~", 0 ],
			"obj-4.20::obj-12" : [ "vst~[35]", "vst~[3]", 0 ],
			"obj-4.20::obj-3" : [ "vst~[36]", "vst~", 0 ],
			"obj-4.2::obj-12" : [ "vst~[41]", "vst~[3]", 0 ],
			"obj-4.2::obj-3" : [ "vst~[40]", "vst~", 0 ],
			"obj-4.3::obj-12" : [ "vst~[1]", "vst~[3]", 0 ],
			"obj-4.3::obj-3" : [ "vst~[2]", "vst~", 0 ],
			"obj-4.4::obj-12" : [ "vst~[3]", "vst~[3]", 0 ],
			"obj-4.4::obj-3" : [ "vst~[4]", "vst~", 0 ],
			"obj-4.5::obj-12" : [ "vst~[6]", "vst~[3]", 0 ],
			"obj-4.5::obj-3" : [ "vst~[5]", "vst~", 0 ],
			"obj-4.6::obj-12" : [ "vst~[7]", "vst~[3]", 0 ],
			"obj-4.6::obj-3" : [ "vst~[8]", "vst~", 0 ],
			"obj-4.7::obj-12" : [ "vst~[9]", "vst~[3]", 0 ],
			"obj-4.7::obj-3" : [ "vst~[10]", "vst~", 0 ],
			"obj-4.8::obj-12" : [ "vst~[12]", "vst~[3]", 0 ],
			"obj-4.8::obj-3" : [ "vst~[11]", "vst~", 0 ],
			"obj-4.9::obj-12" : [ "vst~[14]", "vst~[3]", 0 ],
			"obj-4.9::obj-3" : [ "vst~[13]", "vst~", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "ValhallaSupermassive.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "ValhallaSupermassive_20250314.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "ambix_encoder_o3.maxsnap",
				"bootpath" : "~/Documents/Max 8/Snapshots",
				"patcherrelativepath" : "../../../Max 8/Snapshots",
				"type" : "mx@s",
				"implicit" : 1
			}
, 			{
				"name" : "polytri.maxpat",
				"bootpath" : "~/Documents/CS/Projects/tris",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
